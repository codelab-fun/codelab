import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BreadcrumbComponent } from './breadcrumb.component';
import { ActivatedRoute } from '@angular/router';
import { MENU_ROUTES } from '../../common';
import { CodelabComponentsModule } from '../codelab-components.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CodelabComponentsModule, RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            pathFromRoot: [{ routeConfig: { name: 'lol' } }],
          },
        },
        {
          provide: MENU_ROUTES,
          useValue: [],
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
