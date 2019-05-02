import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent, MatDialog } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { angularSampleCode, LINKS_PLACEHOLDER, MARKDOWN_PLACEHOLDER, TAGS_LIST } from '../shared';
import { SnippetOverviewComponent } from './snippet-modal/snippet-overview.component';
import { Observable } from 'rxjs/internal/Observable';
import { map, startWith } from 'rxjs/operators';


function validatorMaxLines(lines: number) {
  return (control: AbstractControl) => {
    return control.value.split('\n').length > lines ? {linesError: `This field shouldn't have more than ${lines} lines`} : null;
  };
}

function validatorMaxTags(maximumTags: number) {
  return (control: AbstractControl) => {
    return Array.isArray(control.value) && control.value.length > maximumTags ? {tagsError: `Number of tags should be below ${maximumTags + 1}`} : null;
  };
}


@Component({
  selector: 'codelab-create-snippet',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create-snippet.component.html',
  styleUrls: ['./create-snippet.component.scss']
})
export class CreateSnippetComponent {

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  TAGS_LIST = TAGS_LIST;
  tags: Array<string> = ['tip'];
  filteredTags: Observable<string[]>;

  snippetForm = this.fb.group({
    title: ['', Validators.required],
    level: ['beginner', Validators.required],
    tags: [this.tags, [Validators.required, validatorMaxTags(5)]],
    content: [MARKDOWN_PLACEHOLDER, [Validators.required, validatorMaxLines(25)]],
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
    public dialog: MatDialog
  ) {
    this.filteredTags = this.snippetForm.get('tags').valueChanges.pipe(
      startWith(null),
      map((tags: string | null) => tags ? this._filterTags(tags.slice(-1)[0]) : this.TAGS_LIST.slice()));
  }

  onSubmit() {
    if (this.snippetForm.valid) {
      this.dialog.open(
        SnippetOverviewComponent,
        {data: {formValue: this.getPreparedFormValue(this.snippetForm.value)}}
      );
    } else {
      this.markFormControlsAsTouched(this.snippetForm);
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

  markFormControlsAsTouched(formGroup: FormGroup | FormArray): void {
    Object.values(formGroup.controls).forEach(
      (control) => {
        if (control instanceof FormControl) {
          control.markAsTouched({onlySelf: true});
        } else if (control instanceof FormGroup || control instanceof FormArray) {
          this.markFormControlsAsTouched(control);
        }
      });
  }

  private _filterTags(value: string): string[] {
    const filterValue = value ? value.toLowerCase() : null;
    return this.TAGS_LIST.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }
}

