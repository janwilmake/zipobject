import { middleware, RatelimitDO, ratelimit, getSponsor } from "sponsorflare";
export { RatelimitDO };
export default {
  fetch: async (request, env, ctx) => {
    // Handle sponsorflare auth
    const sponsorflare = await middleware(request, env);
    if (sponsorflare) return sponsorflare;
    const { is_authenticated, balance } = await getSponsor(request, env);

    const requestLimit =
      is_authenticated && balance && balance > 0 ? undefined : 50;

    const ratelimited = requestLimit
      ? await ratelimit(request, env, {
          requestLimit,
          resetIntervalMs: 3600000,
        })
      : undefined;

    if (ratelimited) {
      return new Response("Too many requests", {
        status: 429,
        headers: ratelimited.ratelimitHeaders,
      });
    }

    // Proxy request to zipobject.vercel.app with admin secret
    const url = new URL(request.url);
    const targetUrl = new URL(
      url.pathname + url.search,
      "https://zipobject.vercel.app",
    );

    const proxyRequest = new Request(targetUrl, {
      method: request.method,
      headers: new Headers(request.headers),
      body: request.body,
      redirect: "follow",
    });

    // Add Authorization header with admin secret
    proxyRequest.headers.set("Authorization", `Bearer ${env.ADMIN_SECRET}`);

    try {
      // Fetch the response from the target
      const originalResponse = await fetch(proxyRequest);

      // Create a transform stream to measure content size
      const transformStream = new TransformStream({
        start() {
          this.byteCount = 0;
        },
        transform(chunk, controller) {
          this.byteCount += chunk.byteLength;
          controller.enqueue(chunk);
        },
        flush(controller) {
          // Calculate MB for billing (convert bytes to MB)
          const mbSize = this.byteCount / (1024 * 1024);

          // Charge $0.0002/MB (which is 0.02 cents/MB)
          const chargeAmountCents = mbSize * 0.02;

          // Only charge if there's actual data transferred
          if (chargeAmountCents > 0) {
            // Round to 4 decimal places for billing precision
            const roundedChargeCents =
              Math.round(chargeAmountCents * 10000) / 10000;

            // Execute billing in context.waitUntil so it doesn't block the response
            ctx.waitUntil(
              getSponsor(request, env, {
                charge: roundedChargeCents,
                allowNegativeClv: true,
              }),
            );
          }
        },
      });

      // Create headers for the response to send back to the client
      const responseHeaders = new Headers(originalResponse.headers);

      // Stream the response through the transform stream
      const transformedBody =
        originalResponse.body?.pipeThrough(transformStream);

      // Return the response with the transformed body
      return new Response(transformedBody, {
        status: originalResponse.status,
        statusText: originalResponse.statusText,
        headers: responseHeaders,
      });
    } catch (error) {
      // Handle errors gracefully
      console.error("Proxy error:", error);
      return new Response(`Proxy error: ${error.message}`, {
        status: 502,
        headers: { "Content-Type": "text/plain" },
      });
    }
  },
};
