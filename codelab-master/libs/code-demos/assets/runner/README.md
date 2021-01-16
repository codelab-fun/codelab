# Ng bundler

TODO(kirjs): tidy up and add more details.

## Danger

Angular fox warns you:
There is a lot of magic happening in this folder, only touch it if you know what's going on.

```
  _,-=._              /|_/|
  `-.}   `=._,.-=-._.,  @ @._,
     `._ _,-.   )      _,.-'
        `    G.m-"^m`m'        Dmytro O. Redchuk
```

## What's going on here?

We use the files generated here to run code examples in an iframe.
There are two files here that we generate:

1. ng-dts/files.ts - contains all the types for monaco to use
2. ng2/ng-bundle.js - contains all the js files bundled together.

## Regenerating

To regenerate the files:

- run `npm run build:bundler`
- test it in the app really well.

<p align="center">
  <img src="images/fox-warns-you.jpeg" width="500px" alt="Fox is very confused">
</p>
