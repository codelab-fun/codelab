import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { angularSampleCode } from '../shared/angular-sample';

@Component({
  selector: 'codelab-create-snippet',
  templateUrl: './create-snippet.component.html',
  styleUrls: ['./create-snippet.component.css']
})
export class CreateSnippetComponent implements OnInit {

  readonly initialCode = angularSampleCode;
  snippet: any = {};

  readonly snippetForm = this.fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
    author: [''],
    level: ['beginner'],
    tags: [''],
    bonus: [''],
    links: [''],
    demo: [angularSampleCode]
  });

  constructor(private fb: FormBuilder) {
    this.snippetForm.valueChanges.subscribe(value => {
      const raw = this.snippetForm.getRawValue();
      this.snippet = {
        ...raw,
        bonus: raw.bonus.trim(),
        links: raw.links.trim(),
        tags: raw.tags.split(',')
      };

      if (raw.demo['app.component.ts'] !== this.initialCode['app.component.ts']) {
        this.snippet.componentCode = raw.demo['app.component.ts'];
      }

      if (raw.demo['app.module.ts'] !== this.initialCode['app.module.ts']) {
        this.snippet.moduleCode = raw.demo['app.module.ts'];
      }
    });

  }

  ngOnInit() {
  }

}
