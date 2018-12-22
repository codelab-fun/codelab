import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
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
  const path = `../../../../../node_modules/${dependency}`;
  const packageJson = require(join(path, 'package.json'));
  const typings = packageJson && packageJson.typings || 'index.d.ts';
  const main = join(path, typings);
  const out = `./bundles/${dependency}.d.ts`;

  dts.bundle({
    name: dependency,
    baseDir: './',
    referenceExternals: true,
    main,
    out
  });

  const generated = readFileSync(out, 'utf-8');
  let wrapped = `declare module '${dependency}' {
${generated}
}`;
  wrapped = wrapped.replace(/^(import|export) (\{.*\}|\*).*from '.*/gm, '/* Removed: $0 */');
  writeFileSync(out, wrapped, 'utf-8');
});

