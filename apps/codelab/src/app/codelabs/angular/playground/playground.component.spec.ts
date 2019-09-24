import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaygroundComponent } from './playground.component';
import { PlaygroundModule } from './playground.module';
import { ActivatedRoute, Router } from '@angular/router';

describe('PlaygroundComponent', () => {
  let component: PlaygroundComponent;
  let fixture: ComponentFixture<PlaygroundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PlaygroundModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { queryParams: { code: '' } } }
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaygroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create!', () => {
    expect(component).toBeTruthy();
  });
});
