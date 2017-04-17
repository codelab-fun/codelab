/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {EditorsComponent} from './editors.component';
import {StateService} from '../state.service';

import {MockStateService} from '../../../mocks/stateService';
import {AppConfigService} from '../../app-config.service';

describe('EditorsComponent', () => {
  let component: EditorsComponent;
  let fixture: ComponentFixture<EditorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditorsComponent],
      providers: [{
        provide: StateService, useValue: new MockStateService({})
      },
        {
          provide: AppConfigService, useValue: {
          config: {
            debug: false
          }
        }
        }]
    })
      .overrideComponent(EditorsComponent, {set: {template: 'hi'}})
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should return visible files', () => {
    component.files = [{hidden: true}, {hidden: false}];
    expect(component.visibleFiles.length).toEqual(1);
  });
});
