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

# The uithub convention

If you want your website to be explorable through the "universal information terminal", uithub, then you should apply the following convention:

1. Put a zip archive at: `yourdomain.tld/[id]/archive/refs/heads/main.zip`
2. Now you can explore it through `uithub.com/yourdomain.tld/[id][/tree/main][/path/to/folder]`

For a zip of your site you can put it at `yourdomain.tld/public/archive/refs/heads/main.zip` (or other branches/shas) and you can proxy that to https://github.com/owner/repo/archive/refs/heads/main.zip. This way your websites repo will be explorable at https://uithub.com/yourdomain.tld/public. Ensure public isn't allowed as ID as this is reserved for your repo!

By default only `main` is assumed available. Provide the list of all available refs at: yourdomain.tld/[id]/info/refs to see these back in the interface as well!

# Intended dependant open source projects

- [uithub](https://github.com/janwilmake/uithub): exploration of github
- npmjz: exploration of npmjs/jsr and other package managers
- ingestwiki: exploration of wikipedia
- site2text: exploration of any website as markdown
- gcombinator.news: the ycombinator site but with extra features

...you?! ☝️
