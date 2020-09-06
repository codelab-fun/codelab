import { InjectionToken } from '@angular/core';
import { Route } from '@angular/router';

export type MenuRoutes = MenuRoute[];

interface MenuRoute extends Route {
  name?: string;
  description?: string;
  page?: string;
  prod?: boolean;
  translationIds?: string[];
  children?: MenuRoutes;
}

export const MENU_ROUTES = new InjectionToken<MenuRoutes>('menuRoutes');
