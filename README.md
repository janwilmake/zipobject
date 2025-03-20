# Zip Object

This is a proxy for [zipobject.vercel](https://github.com/janwilmake/zipobject.vercel) and [zipobject.tree](https://github.com/janwilmake/zipobject.tree) (private repos). It's a monetised and authenticated cloudflare worker (using [sponsorflare](https://github.com/janwilmake/sponsorflare)) that proxies request with monetisation and ratelimit in between, looking at response content size and charges $0.20/GB.

This is a great example of a small worker that adds ip-ratelimit, authentication, and monetisation in just over 100 lines of code, charging based on the response size!

![](architecture.drawio.svg)

## CHANGELOG:

### Zipobject Monetisation - 2025-03-16

- ✅ Zipobject vercel should just be admin-authorized https://zipobject.vercel.app
- ✅ Whereas zipobject.com should be at cloudflare and proxy it with monetisation looking at response content size and charge $0.20/GB.
- ✅ Ensure zip URL authorization can be provided in `x-zip-api-Key` header only.

### Added tree endpoint

- ✅ Added much cheaper endpoint to receive the tree for any repo (zip only): `/tree/{zipUrl}`

# Intended dependant open source projects

- [uithub](https://github.com/janwilmake/uithub): exploration of github
- npmjz: exploration of npmjs/jsr and other package managers
- ingestwiki: exploration of wikipedia
- site2text: exploration of any website as markdown
- gcombinator.news: the ycombinator site but with extra features

...you?! ☝️
