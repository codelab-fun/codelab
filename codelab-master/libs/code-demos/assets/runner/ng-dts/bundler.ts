import { readFileSync, writeFileSync } from 'fs';
import { join, basename } from 'path';

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

interface FileModule {
  typings: string;
  dtsPaths: string[];
}

const fileModules: FileModule[] = folders.map(
  (folder): FileModule => ({
    typings: (
      JSON.parse(
        readFileSync(`node_modules/${folder}/package.json`, {
          encoding: 'utf-8'
        })
      ) || {}
    ).typings,
    dtsPaths: glob.sync(`node_modules/${folder}/**/*.d.ts`)
  })
);

const vendors = [].concat(
  ...fileModules.map(({ typings, dtsPaths }) => {
    return dtsPaths.map(path => {
      const paths = [path];
      if (typings) {
        const dtsFileName = basename(path);
        const typingsName = basename(typings);
        if (typingsName === dtsFileName) {
          paths.push(path.replace(dtsFileName, 'index.d.ts'));
        }
      }

      const content = readFileSync(path, 'UTF-8');
      return { paths, content };
    });
  })
);

const content = JSON.stringify(vendors, null, 2);
writeFileSync(join(__dirname, './files.txt'), content, 'utf-8');

console.log('Done: ');
console.log('number of types', vendors.length);
console.log('File size (kb): ', content.length / 1000);
