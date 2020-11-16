import { AppModule } from '../app.module';
import { RouterModule, ROUTES } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { app_html } from '../code';

function getRoutes() {
  let metadata;
  try {
    metadata = AppModule['__annotations__'][0];
    const routerImport = metadata.imports.find(imp => imp.ngModule === RouterModule);

    function findRecByToken(dep) {
      if (Array.isArray(dep)) {
        for (let d = 0; d < dep.length; d++) {
          const rec = findRecByToken(dep[d]);
          if (rec) {
            return rec;
          }
        }
        return;
      }
      // Well...
      return dep.provide && dep.provide._desc && dep.provide._desc === 'ROUTES' && dep.useValue;
    }

    return findRecByToken(routerImport.providers);
  } catch (e) {
    // Do nothing, we have assertions below for this case
  }
  return undefined;
}

describe('router', () => {
  it('UseRouterModule', () => {
    chai.expect(Array.isArray(getRoutes()), 'Can\'t find any routes provided').to.be.true;
  });

  it('AddEmptyRoute', () => {
    const routes = getRoutes();
    chai.expect(routes.length, 'Empty array was provided, need actual routes.').to.be.above(0);
    const route = routes.find(r => r.path === '');
    chai.expect(route, 'Can\'t find a route with empty path').not.to.be.undefined;
    chai.expect(route.component && route.component.toString()
      .includes('SearchComponent'), 'There\'s a module with empty path, but it doesn\'t display SearchComponent')
      .to.be.true;
  });

  it('AddUploadRoute', () => {
    const routes = getRoutes();
    chai.expect(routes.length, 'Empty array was provided, need actual routes.').to.be.above(0);
    const route = routes.find(r => r.path === 'upload');
    chai.expect(route, 'Can\'t find a route with empty path').not.to.be.undefined;
    chai.expect(route.component && route.component.toString()
      .includes('UploadComponent'), 'There\'s a module with empty path, but it doesn\'t display SearchComponent')
      .to.be.true;
  });

  it('AddRouterOutlet', () => {
    const div = document.createElement('div');
    div.innerHTML = app_html;
    chai.expect(!!div.querySelector('router-outlet'), 'Can\'t find router outlet').to.be.true;
  });

  it('AddSearchMenu', () => {
    const div = document.createElement('div');
    div.innerHTML = app_html;
    const search = div.querySelector('[routerLink="/"]');
    chai.expect(!!search, 'Can\'t find a menu item with a routerLink of "/"').to.be.true;
    chai.expect(search.innerHTML.toLowerCase().includes('search'), 'The menu item should contain word "search"').to.be.true;
  });

  it('AddUploadMenu', () => {
    const div = document.createElement('div');
    div.innerHTML = app_html;
    const search = div.querySelector('[routerLink="/upload"]');
    chai.expect(!!search, 'Can\'t find a menu item with a routerLink of "/upload"').to.be.true;
    chai.expect(search.innerHTML.toLowerCase().includes('upload'), 'The menu item should contain word "upload"').to.be.true;
  });
});
