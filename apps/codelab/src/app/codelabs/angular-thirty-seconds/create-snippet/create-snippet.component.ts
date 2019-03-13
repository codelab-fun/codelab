import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent, MatDialog } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MARKDOWN_PLACEHOLDER, TAGS_LIST, angularSampleCode } from '../shared';
import { SnippetOverviewComponent } from './snippet-modal/snippet-overview.component';
import { Observable } from 'rxjs/internal/Observable';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'codelab-create-snippet',
  templateUrl: './create-snippet.component.html',
  styleUrls: ['./create-snippet.component.scss']
})
export class CreateSnippetComponent {


  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  TAGS_LIST = TAGS_LIST;
  tags: Array<string> = ['Tips'];
  filteredTags: Observable<string[]>;

  snippetForm = this.fb.group({
    title: ['', Validators.required],
    level: ['Beginner', Validators.required],
    tags: ['Tips', Validators.required],
    content: [MARKDOWN_PLACEHOLDER, Validators.required],
    bonus: [MARKDOWN_PLACEHOLDER, ''],
    links: [MARKDOWN_PLACEHOLDER, ''],
    demo: [angularSampleCode]
  });

  isBonus = false;
  isLinks = false;
  isDemo = false;

  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.filteredTags = this.snippetForm.get('tags').valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filterTags(tag) : this.TAGS_LIST.slice()));
  }

  onSubmit() {
    if (this.snippetForm.valid) {
      this.dialog.open(
        SnippetOverviewComponent,
        {
          data: {
            snippetBody: this.getSnippetModel(this.snippetForm.value),
            snippetTitle: this.snippetForm.get('title').value
          }
        }
      );
    } else {
      this.markFormControlsAsTouched(this.snippetForm);
    }
  }

  getSnippetModel(value): string {
    value['bonus'] = this.isBonus ? value['bonus'] : null;
    value['links'] = this.isLinks ? value['links'] : null;
    value['demo'] = this.isDemo ? value['demo'] : null;
    const isDemoComponentChanged = this.isDemo && value.demo['app.component.ts'] !== angularSampleCode['app.component.ts'];
    const isDemoModuleChanged = this.isDemo && value.demo['app.module.ts'] !== angularSampleCode['app.module.ts'];

    return `
---

## __Title:__ ${value.title}

## __Level:__ ${value.level}

## __Tags:__ ${value.tags}

---

# Content

${value.content}
${this.isBonus ? `

# Bonus

${value.bonus}` : ``}
${this.isLinks ? `

# Links

${value.links}` : ``}
${this.isDemo && (isDemoModuleChanged || isDemoComponentChanged) ? `

# Demo
${isDemoComponentChanged ? `

### app.component.ts
\`\`\`typescript
${value.demo['app.component.ts']}
\`\`\`
` : ``}
${isDemoModuleChanged ? `

### app.module.ts
\`\`\`typescript
${value.demo['app.module.ts']}
\`\`\`
` : ``}
` : ``}`;
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

      this.snippetForm.get('tags').patchValue(this.tags.join(', '));
    }
  }

  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
    this.snippetForm.get('tags').patchValue(this.tags.join(', '));
  }

  selectedTags(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.snippetForm.get('tags').patchValue(this.tags.join(', '));
  }

  private _filterTags(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.TAGS_LIST.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
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
}

