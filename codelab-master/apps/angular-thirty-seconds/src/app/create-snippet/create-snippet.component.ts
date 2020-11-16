import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent
} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs/internal/Observable';
import { finalize, map } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { SnippetOverviewComponent } from './snippet-modal/snippet-overview.component';
import {
  angularSampleCode,
  LINKS_PLACEHOLDER,
  MARKDOWN_PLACEHOLDER,
  TAGS_LIST
} from '../shared';
import { SnippetService } from '../shared/services/snippet.service';
import {
  markFormControlsAsTouched,
  validatorMaxLines,
  validatorMaxTags
} from '../shared/functions/validation';
import { parseSnippet } from '../shared/functions/parse-snippet';
import { SEPARATOR } from '../shared/consts';

interface SnippetFileInfo {
  sha: string;
  fileName: string;
  snippet: string;
  branchName: string;
}

function importSnippet(snippet) {
  const result = { ...snippet };
  result.links = (result.links || []).join(SEPARATOR);
  return result;
}

@Component({
  selector: 'codelab-create-snippet',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create-snippet.component.html',
  styleUrls: ['./create-snippet.component.scss']
})
export class CreateSnippetComponent implements OnDestroy {
  @ViewChild('tagInput', { static: false }) tagInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  repoName: string;
  repoOwner: string;

  destroy = new ReplaySubject<void>(1);

  isLoading = false;
  isEditing = false;
  snippetFileInfo: SnippetFileInfo;

  TAGS_LIST = TAGS_LIST;
  tags: string[] = ['tip'];
  filteredTags: Observable<string[]>;

  snippetForm = this.fb.group({
    title: ['', Validators.required],
    twitter: [''],
    level: ['beginner', Validators.required],
    tags: [this.tags, [Validators.required, validatorMaxTags(5)]],
    content: [
      MARKDOWN_PLACEHOLDER,
      [Validators.required, validatorMaxLines(25)]
    ],
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
    public dialog: MatDialog
  ) {
    const pullNumber = this.activatedRoute.snapshot.params['pullNumber'];
    this.repoName = this.activatedRoute.snapshot.params['repoName'];
    this.repoOwner = this.activatedRoute.snapshot.params['repoOwner'];

    if (pullNumber) {
      this.isEditing = true;
      this.fetchPR(pullNumber);
    }

    this.filteredTags = this.snippetForm
      .get('tags')
      .valueChanges.pipe(
        map((tags: string) =>
          tags ? this._filterTags(tags.slice(-1)[0]) : this.TAGS_LIST.slice()
        )
      );
  }

  fetchPR(pullNumber: number) {
    this.isLoading = true;
    this.snippetService
      .fetchPR(this.repoName, this.repoOwner, pullNumber)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.cd.markForCheck();
        })
      )
      .subscribe((snippetFileInfo: SnippetFileInfo) => {
        this.snippetFileInfo = snippetFileInfo;

        const snippet = importSnippet(parseSnippet(snippetFileInfo.snippet));
        if (snippet.demo) {
          this.hasDemo = true;
        }
        if (snippet.bonus) {
          this.hasBonus = true;
        }
        if (snippet.links) {
          this.hasLinks = true;
        }
        this.snippetForm.patchValue(snippet);
      });
  }

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }

  openPreview() {
    if (this.snippetForm.valid) {
      this.dialog.open(SnippetOverviewComponent, {
        data: {
          formValue: this.getPreparedFormValue(this.snippetForm.value),
          isEditing: this.isEditing,
          fileInfo: this.snippetFileInfo
            ? {
                sha: this.snippetFileInfo['sha'],
                fileName: this.snippetFileInfo['fileName'],
                branchName: this.snippetFileInfo['branchName']
              }
            : null,
          repoName: this.repoName,
          repoOwner: this.repoOwner
        }
      });
    } else {
      markFormControlsAsTouched(this.snippetForm);
    }
  }

  getPreparedFormValue(value) {
    Object.keys(value['demo']).forEach(x => {
      const isChangedAndNotEmpty =
        this.hasDemo && value.demo[x] && value.demo[x] !== angularSampleCode[x];
      value['demo'][x] = isChangedAndNotEmpty ? value.demo[x] : null;
    });
    value['bonus'] = this.hasBonus ? value['bonus'] : null;
    value['links'] = this.hasLinks ? value['links'] : null;
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
    return this.TAGS_LIST.filter(
      tag => tag.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
