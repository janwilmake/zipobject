# Zipobject

Monetised and authenticated cloudflare worker (using sponsorflare) that proxies request with monetisation and ratelimit in between, looking at response content size and charges $0.20/GB.

This is a great example of a small worker that adds ip-ratelimit, authentication, and monetisation in just over 100 lines of code, charging based on the response size!

![](architecture.drawio.svg)

TODO:

- Provide programmatic way to login and get API key, and document this in the OpenAPI. It's probably good to add this into sponsorflare as well.
- Provide programmatic way to retrieve usage and show this in a table on per-month basis as well as last 14 days on a per-day basis in a graph.
- Provide ability to create/rotate api key, and ensure the api key is not the same as the key you login with, but a key specifically made for API use.

After this is there, this'd be a great thing to show to people, as a minimal example of how to build a paid API with Cloudflare.
