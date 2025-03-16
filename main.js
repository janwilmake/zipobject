import { middleware, RatelimitDO, ratelimit, getSponsor } from "sponsorflare";
export { RatelimitDO };
export default {
  fetch: async (request, env) => {
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

    // Request can be made safely. Proxy to zipobject.vercel
    // Measure response content size and charge $0.0002/MB.

    return new Response("NOT FOUND", { status: 404 });
  },
};
