import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent, MatDialog } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs/internal/Observable';
import { map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { SnippetOverviewComponent } from './snippet-modal/snippet-overview.component';
import { angularSampleCode, LINKS_PLACEHOLDER, MARKDOWN_PLACEHOLDER, TAGS_LIST } from '../shared';
import { SnippetService } from '../shared/services/snippet.service';
import { GitHubService } from '../shared/services/github.service';
import { ValidationsService } from '../shared/services/validations.service';
import { REPO_NAME, REPO_OWNER } from '../shared/constants/repo-info';
import { markFormControlsAsTouched } from '../shared/functions/validation';


// @ts-ignore
window.Buffer = {
  from() {
  }
};

// @ts-ignore
const matter = require('gray-matter');

/**
 *
 * Takes markdown and returns content.
 * e.g. input:
 *
 * # LOL
 * 1
 * # HI
 * 2
 *
 * result:
 *
 * {LOL: "1", HI: "2"}
 */
function extractHeaders(str) {
  const match = ('\n' + str + '\n#').match(/\n#+.*\n[\s\S]*?(?=\n#)/g);
  return !match ? {content: str} : match
    .reduce((result, a) => {
      const {groups} = a.match(/^\n(?<depth>#+)(?<header>.*)\n(?<content>[\s\S]*)$/);
      result[groups.header.trim().toLocaleLowerCase()] = groups.content.trim();
      return result;
    }, {});
}

/**
 *
 * Takes markdown and returns content.
 * e.g. input:
 *
 * ---
 * title: Hello
 * tags:
 * - tips
 * - good-to-know
 * ---
 *
 *
 *
 *
 * # LOL
 * 1
 * # HI
 * 2
 *
 * result:
 *
 * {title: "Hello", tags: ["tips", "good-to-know"], LOL: "1", HI: "2"}
 *
 */
function mdTextToJson(snippet: string) {
  const metaData = matter(snippet);
  const result = ({...extractHeaders(metaData.content), ...metaData.data});
  if (result['links']) {
    result['links'] = result['links'].join('\n');
  }
  return result;
}

@Component({
  selector: 'codelab-create-snippet',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create-snippet.component.html',
  styleUrls: ['./create-snippet.component.scss']
})
export class CreateSnippetComponent implements OnDestroy {

  @ViewChild('tagInput', {static: false}) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  isLoading = false;
  isEditing = false;
  snippetFileInfo = {};

  TAGS_LIST = TAGS_LIST;
  tags: Array<string> = ['tip'];
  filteredTags: Observable<string[]>;

  snippetForm = this.fb.group({
    title: ['', Validators.required],
    twitter: [''],
    level: ['beginner', Validators.required],
    tags: [this.tags, [Validators.required, ValidationsService.validatorMaxTags(5)]],
    content: [MARKDOWN_PLACEHOLDER, [Validators.required, ValidationsService.validatorMaxLines(25)]],
    bonus: [''],
    links: [LINKS_PLACEHOLDER],
    demo: [angularSampleCode]
  });

  hasBonus = false;
  hasLinks = false;
  hasDemo = false;

  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private snippetService: SnippetService,
    private githubService: GitHubService,
    public dialog: MatDialog
  ) {
    const pullNumber = this.activatedRoute.snapshot.params['pullNumber'];

    if (pullNumber) {
      this.isEditing = true;
      this.getPullFileByPullNumber(pullNumber);
    }

    this.filteredTags = this.snippetForm.get('tags').valueChanges.pipe(
      // tslint:disable-next-line:deprecation
      startWith(null),
      map((tags: string | null) => tags ? this._filterTags(tags.slice(-1)[0]) : this.TAGS_LIST.slice()));
  }

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }

  getPullFileByPullNumber(pullNumber) {
    this.isLoading = true;
    const pr$ = this.githubService.getPullByPullNumber(REPO_OWNER, REPO_NAME, pullNumber);
    const file$ = this.githubService.getPullFileByPullNumber(REPO_OWNER, REPO_NAME, pullNumber)
      .pipe(switchMap(([file]) => {
        return this.githubService.getSnippetBody(file['contents_url'])
          .pipe(map(res => {
            const body = atob(res.content);
            return {...res[0], body, sha: file['sha'], fileName: file['filename']};
          }));
      }));
    combineLatest([file$, pr$])
      .pipe(takeUntil(this.destroy))
      .subscribe(([file, pr]) => {
          this.snippetFileInfo = {
            sha: file['sha'],
            fileName: file['fileName'],
            snippet: mdTextToJson(file['body']),
            branchName: pr['head']['ref']
          };
          this.patchFormValue(this.snippetFileInfo['snippet']);
        }
      )
      .add(() => {
        this.isLoading = false;
        this.cd.markForCheck();
      });
  }

  patchFormValue(value) {
    this.tags = value['tags'] && value['tags'].length ? value['tags'] : [];
    value['content'] = value['content'] ? value['content'].replace(/↵/g, '\n') : '';
    if (value['bonus']) {
      this.hasBonus = true;
      value['bonus'] = value['bonus'].replace(/↵/g, '\n');
    }
    if (value['links']) {
      this.hasLinks = true;
      value['links'] = value['links'].replace(/↵/g, '\n');
    }
    if (value['demo']) {
      this.hasDemo = true;
      value['demo'] = {
        'app.component.ts': value['demo']['app.component.ts'] ? value['demo']['app.component.ts'].replace(/↵/g, '\n') : angularSampleCode['app.component.ts'],
        'app.module.ts': value['demo']['app.module.ts'] ? value['demo']['app.module.ts'].replace(/↵/g, '\n') : angularSampleCode['app.module.ts'],
        'main.ts': value['demo']['main.ts'] ? value['demo']['main.ts'].replace(/↵/g, '\n') : angularSampleCode['main.ts'],
        'index.html': value['demo']['index.html'] ? value['demo']['index.html'].replace(/↵/g, '\n') : angularSampleCode['index.html']
      };
    }
    this.snippetForm.patchValue(value);
  }

  openPreview() {
    if (this.snippetForm.valid) {
      this.dialog.open(SnippetOverviewComponent, {
        data: {
          formValue: this.getPreparedFormValue(this.snippetForm.value),
          isEditing: this.isEditing,
          fileInfo: this.snippetFileInfo ? {
            sha: this.snippetFileInfo['sha'],
            fileName: this.snippetFileInfo['fileName'],
            branchName: this.snippetFileInfo['branchName']
          } : null
        }
      });
    } else {
      markFormControlsAsTouched(this.snippetForm);
    }
  }

  getPreparedFormValue(value) {
    const isDemoComponentChangedAndNotEmpty = this.hasDemo && value.demo['app.component.ts'] && value.demo['app.component.ts'] !== angularSampleCode['app.component.ts'];
    const isDemoModuleChangedAndNotEmpty = this.hasDemo && value.demo['app.module.ts'] && value.demo['app.module.ts'] !== angularSampleCode['app.module.ts'];
    const isDemoMainChangedAndNotEmpty = this.hasDemo && value.demo['main.ts'] && value.demo['main.ts'] !== angularSampleCode['main.ts'];
    value['bonus'] = this.hasBonus ? value['bonus'] : null;
    value['links'] = this.hasLinks ? value['links'] : null;
    value.demo['app.component.ts'] = isDemoComponentChangedAndNotEmpty ? value.demo['app.component.ts'] : null;
    value.demo['app.module.ts'] = isDemoModuleChangedAndNotEmpty ? value.demo['app.module.ts'] : null;
    value.demo['main.ts'] = isDemoMainChangedAndNotEmpty ? value.demo['main.ts'] : null;
    return value;
  }

  addTag(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;
      if ((value || '').trim()) {
        this.tags.push(value.trim());
      }
      if (input) {
        input.value = '';
      }
      this.snippetForm.get('tags').patchValue(this.tags);
    }
  }

  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
    this.snippetForm.get('tags').patchValue(this.tags);
  }

  selectedTags(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.snippetForm.get('tags').patchValue(this.tags);
  }

  private _filterTags(value: string): string[] {
    const filterValue = value ? value.toLowerCase() : null;
    return this.TAGS_LIST.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }
}

