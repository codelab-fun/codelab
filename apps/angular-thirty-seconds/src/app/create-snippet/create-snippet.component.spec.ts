import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatChipsModule, MatDialog, MatSelectModule } from '@angular/material';
import SpyObj = jasmine.SpyObj;
import { of } from 'rxjs';

import { CreateSnippetComponent } from './create-snippet.component';
import { SnippetService } from '../shared/services/snippet.service';


const matDialogMock = {};

describe('CreateSnippetComponent', () => {
  let component: CreateSnippetComponent;
  let fixture: ComponentFixture<CreateSnippetComponent>;
  let snippetService: SpyObj<SnippetService>;
  let activatedRoute: Partial<ActivatedRoute>;

  beforeEach(async(() => {

    activatedRoute = {
      snapshot: {
        params: {}
      }
    } as any;

    snippetService = jasmine.createSpyObj('snippetService', [
      'fetchPR'
    ]);

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatChipsModule,
        MatSelectModule,
      ],
      declarations: [
        CreateSnippetComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useFactory: () => activatedRoute
        },
        {
          provide: SnippetService,
          useValue: snippetService,
        },
        {
          provide: MatDialog, useValue: matDialogMock
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSnippetComponent);
    component = fixture.componentInstance;

    snippetService = TestBed.get(SnippetService);
  });

  it('should create snippet', () => {
    const repoName = 'name';
    const repoOwner = 'PIKACHU';
    const pullNumber = 689;

    activatedRoute = {
      snapshot: {
        params: {
          pullNumber,
          repoName,
          repoOwner
        }
      }
    } as any;

    snippetService.fetchPR.and.returnValue(of({}));

    fixture = TestBed.createComponent(CreateSnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(snippetService.fetchPR).toHaveBeenCalledWith(repoName, repoOwner, pullNumber);
  });
});
