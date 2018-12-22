import { readFileSync, writeFileSync } from 'fs';
import * as dts from 'dts-bundle';

export const dtsBundlerDependencies = [
  '@angular/core',
  '@angular/common',
  '@angular/forms',
  '@angular/http',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',
  '@angular/router',
  'rxjs',
  'rxjs/operators',
  '@ngrx/effects',
  '@ngrx/router-store',
  '@ngrx/store'
];

dtsBundlerDependencies.forEach(dependency => {
  const main = `../../../../../node_modules/${dependency}/index.d.ts`;
  const out = `./bundles/${dependency}.d.ts`;

  dts.bundle({
    name: dependency,
    baseDir: './',
    main,
    out
  });

  const generated = readFileSync(out, 'utf-8');
  const updated = `declare module '${dependency}' {
${generated}
}`;
  writeFileSync(out, updated, 'utf-8');
});

