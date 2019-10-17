import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSnippetComponent } from './create-snippet.component';
import { CreateSnippetModule } from './create-snippet.module';
import { ActivatedRoute } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SnippetService } from '../shared/services/snippet.service';
import SpyObj = jasmine.SpyObj;
import { of } from 'rxjs';

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

    snippetService = jasmine.createSpyObj('snippetService', ['fetchPR']);

    TestBed.configureTestingModule({
      imports: [CreateSnippetModule, NoopAnimationsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useFactory: () => activatedRoute
        },
        {
          provide: SnippetService,
          useValue: snippetService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {});

  xit('should create', () => {
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

    expect(snippetService.fetchPR).toHaveBeenCalledWith(
      repoName,
      repoOwner,
      pullNumber
    );
  });
});
