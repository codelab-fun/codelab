import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const glob = require('glob');

const folders = [
  '@angular/core',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',
  '@angular/router',
  '@angular/cdk',
  '@angular/material/autocomplete',
  '@angular/material/badge',
  '@angular/material/bottom-sheet',
  '@angular/material/button',
  '@angular/material/button-toggle',
  '@angular/material/card',
  '@angular/material/checkbox',
  '@angular/material/chips',
  '@angular/material/core',
  '@angular/material/datepicker',
  '@angular/material/dialog',
  '@angular/material/divider',
  '@angular/material/expansion',
  '@angular/material/form-field',
  '@angular/material/grid-list',
  '@angular/material/icon',
  '@angular/material/input',
  '@angular/material/list',
  '@angular/material/menu',
  '@angular/material/paginator',
  '@angular/material/progress-bar',
  '@angular/material/progress-spinner',
  '@angular/material/radio',
  '@angular/material/select',
  '@angular/material/sidenav',
  '@angular/material/slide-toggle',
  '@angular/material/slider',
  '@angular/material/snack-bar',
  '@angular/material/sort',
  '@angular/material/stepper',
  '@angular/material/table',
  '@angular/material/tabs',
  '@angular/material/toolbar',
  '@angular/material/tooltip',
  '@angular/material/tree',
  '@angular/forms',
  'rxjs'
];
const files = [].concat(
  ...folders.map(folder => glob.sync(`node_modules/${folder}/**/*.d.ts`))
);

const vendors = files.map(path => {
  const content = readFileSync(path, 'UTF-8');
  return { path, content };
});

writeFileSync(
  join(__dirname, './files.txt'),
  JSON.stringify(vendors, null, 2),
  'utf-8'
);

// tslint:disable-next-line:no-console
console.info('Done: ', vendors.length);
