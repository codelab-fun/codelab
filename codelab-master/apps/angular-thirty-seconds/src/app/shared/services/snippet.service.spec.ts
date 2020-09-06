import { TestBed } from '@angular/core/testing';
import { SnippetService } from './snippet.service';
import { GitHubService } from './github.service';
import { of } from 'rxjs';
import SpyObj = jasmine.SpyObj;

describe('SnippetService', () => {
  let gitHubService: SpyObj<GitHubService>;
  const repoName = '30seconds';
  const repoOwner = 'PIKACHU';
  const pullNumber = 689;

  beforeEach(() => {
    gitHubService = jasmine.createSpyObj('gitHubService', [
      'getPullByPullNumber',
      'getPullFileByPullNumber',
      'getSnippetBody'
    ]);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: GitHubService,
          useValue: gitHubService
        }
      ]
    });
  });

  it('should be created', () => {
    const snippet = 'pirojok';
    const fileName = 'john';
    const contents_url = 'LOL';
    const branchName = 'branch';

    const service: SnippetService = TestBed.inject(SnippetService);

    gitHubService.getPullByPullNumber.and.returnValue(
      of({
        head: { ref: branchName }
      })
    );
    const sha = 'sa sha';

    gitHubService.getPullFileByPullNumber.and.returnValue(
      of([
        {
          contents_url,
          sha,
          filename: fileName
        }
      ])
    );

    gitHubService.getSnippetBody.and.returnValue(
      of({
        content: btoa(snippet)
      })
    );

    service.fetchPR(repoName, repoOwner, pullNumber).subscribe(result => {
      expect(result).toEqual({
        branchName,
        fileName,
        sha,
        snippet
      });
    });
  });
});
