import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const glob = require('glob');

const folders = [
  '@angular/core',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',
  '@angular/router',
  '@angular/material',
  '@angular/forms',
  'rxjs'
];
const files = [].concat(...folders.map(folder => glob.sync(`node_modules/${folder}/**/*.d.ts`)));

const vendors = files.map((path) => {
  const content = readFileSync(path, 'UTF-8');
  return {path, content};
});

writeFileSync(join(__dirname, './files.txt'), JSON.stringify(vendors, null, 2), 'utf-8');
console.info('Done: ', vendors.length);
