import { TestBed } from '@angular/core/testing';

import { MenuRouteService } from './menu-route.service';
import { ActivatedRoute } from '@angular/router';
import { MENU_ROUTES, MenuRoutes } from '../../common';

describe('MenuRouteService', () => {
  const menuRoutes: MenuRoutes = [
    {
      path: 'previouslesson',
      prod: true
    },
    {
      path: 'currentlesson',
      prod: true
    },
    {
      path: 'nextlesson',
      prod: true
    }
  ];

  const activatedRouteStub = {
    snapshot: {
      pathFromRoot: [
        {
          routeConfig: menuRoutes[1]
        }
      ]
    }
  } as ActivatedRoute;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [{ provide: MENU_ROUTES, useValue: menuRoutes }]
    })
  );

  it('should be created', () => {
    const service: MenuRouteService = TestBed.inject(MenuRouteService);
    expect(service).toBeTruthy();
  });

  it('getPreviousLink should return previouslesson', () => {
    const service: MenuRouteService = TestBed.inject(MenuRouteService);
    const previousLink = service.getPreviousLink(activatedRouteStub);
    expect(previousLink).toEqual(menuRoutes[0].path);
  });

  it('getNextLink should return nextlesson', () => {
    const service: MenuRouteService = TestBed.inject(MenuRouteService);
    const nextLink = service.getNextLink(activatedRouteStub);
    expect(nextLink).toEqual(menuRoutes[2].path);
  });
});
