# zipobject

Monetised and authenticated cloudflare worker (using sponsorflare) that proxies request with monetisation and ratelimit in between, looking at response content size and charges $0.20/GB.

This is a great example of a small worker that adds ip-ratelimit, authentication, and monetisation in just over 100 lines of code, charging based on the response size!

TODO:

- Provide programmatic way to login and get API key, and document this in the OpenAPI. It's probably good to add this into sponsorflare as well.
- Provide ability to create/rotate api key, and ensure the api key is not the same as the key you login with, but a key specifically made for API use.
- Public repos is as cheap as possible (see cost vercel), private repos cost is 10x (profit is here).
