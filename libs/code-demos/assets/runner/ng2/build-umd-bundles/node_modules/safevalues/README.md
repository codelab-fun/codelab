# safevalues

WARNING: This library is still in development and we might make
backward-incompatible changes at any moment.

Safevalues is a library to help you prevent Cross-Site Scripting vulnerabilities
in TypeScript (and JavaScript). It is meant to be used together with
[tsec](https://github.com/googleinterns/tsec) to provide strong security
guarantees and help you deploy
[Trusted Types](https://w3c.github.io/webappsec-trusted-types/dist/spec/) and
other CSP restrictions in your applications. Google has used these components
together to reduce DOM XSS ([paper](https://research.google/pubs/pub49950/)),
and we hope it will be useful in your codebase.

## Features

### Policy definition for building safe-by-construction Trusted Types

Trusted Types is a browser API that enables developers to control the values
that can be assigned to XSS sinks. Developers need to define a Trusted Type
policy to build these values, and then the Trusted Type API constrains these
policies.

The Trusted Types API is not opinionated on what *should be* considered safe. It
only acts as a tool for developers to mark values they can *trust*.

`safevalues` in contrast, defines functions that make security decisions on what
is safe (by construction, via escaping or sanitization), so that developers who
are not security experts don't need to.

`safevalues` produces Trusted Types (through its own policy) when available.

### Additional types and functions for sinks not covered by Trusted Types

Some DOM APIs are not covered by Trusted Types, but can also be abused; leading
to XSS or other security issues. Alternative security mechanisms such as the
`unsafe-inline` CSP protection can help to secure these APIs, but not all
browsers or apps support them.

`safevalues` defines additional types, builders, and setters to help protect
these sinks.

### DOM sink wrappers

To build a Trusted Type-compatible app and surface potential violations at
compile time, we recommend that you compile your code with
[tsec](https://github.com/googleinterns/tsec). tsec bans certain DOM APIs.
`safevalues` defines wrappers around these APIs which lets you assign Trusted
Types with them.

Some wrappers don't require a particular type, but sanitize the argument they
get before they assign it to the DOM sink (e.g. `safeLocation.setHref`).

### Trusted Type polyfills

Whenever possible, `safevalues` uses Trusted Types to build its values, in order
to benefit from the runtime protection of Trusted Types. When Trusted Types is
not available, `safevalues` transparently defines its own types and your app
will continue to work.

--------------------------------------------------------------------------------

[Read on](https://github.com/google/safevalues/tree/main/src) about for more
information on our APIs.

## Disclaimer

**This is not an officially supported Google product.**
