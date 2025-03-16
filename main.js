import { middleware, RatelimitDO } from "sponsorflare";
export { RatelimitDO };
export default {
  fetch: async (request, env) => {
    // Handle sponsorflare auth
    const sponsorflare = await middleware(request, env);
    if (sponsorflare) return sponsorflare;

    return new Response("NOT FOUND", { status: 404 });
  },
};
