import { Component, forwardRef, Optional, Self } from '@angular/core';
import { MonacoConfigService, monacoReady } from '@codelab/code-demos';
import { editor, IRange, Range } from 'monaco-editor';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { CodeDemoEditorInjector } from '@codelab/code-demos/src/lib/code-demo-editor/code-demo-editor.injector';
import { MonacoSelection, MonacoSelectionService } from '@codelab/code-demos/src/lib/shared/monaco-selection.service';
import IEditorDecorationsCollection = editor.IEditorDecorationsCollection;
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;

export function rangeToJSON(range: IRange) {
  return {
    startLineNumber: range.startLineNumber,
    startColumn: range.startColumn,
    endLineNumber: range.endLineNumber,
    endColumn: range.endColumn
  };
}

export function rangeToDecoration(range: Range) {
  return {
    range: range,
    options: {inlineClassName: 'highlighted-code-v2'},
  };
}

type Highlights = Record<string, IRange[]>;

@Component({
  selector: 'slides-highlight-button',
  templateUrl: './highlight-button.component.html',
  styleUrls: ['./highlight-button.component.css'],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HighlightButtonComponent),
      multi: true,
    },
  ],
  imports: [
    MatButtonModule,
    CommonModule,
  ]
})
export class HighlightButtonComponent implements ControlValueAccessor {
  private readonly editorToDecorationCollection = new Map<IStandaloneCodeEditor, IEditorDecorationsCollection>;
  private onchange: Function;
  readonly selection$ = this.monacoSelectionService.selection$;
  private highlights: Highlights;

  constructor(
    private readonly monacoSelectionService: MonacoSelectionService,
    private readonly monacoConfigService: MonacoConfigService,
    @Self() @Optional() private editorInjector: CodeDemoEditorInjector,
  ) {
  }

  writeValue(highlights: Highlights): void {
    this.highlights = highlights;
  }

  registerOnChange(fn: Function): void {
    this.onchange = fn;
  }

  registerOnTouched(fn: any): void {

  }

  setDisabledState?(isDisabled: boolean): void {

  }

  getDecorationColection(editor: IStandaloneCodeEditor): IEditorDecorationsCollection {
    if (this.editorToDecorationCollection.has(editor)) {
      return this.editorToDecorationCollection.get(editor);
    }

    const collection = editor.createDecorationsCollection();
    this.editorToDecorationCollection.set(editor, collection);
    return collection;
  }

  async addHighlight(selection: MonacoSelection) {
    const monaco = await monacoReady();

    const range = selection.range;
    const decorationsCollection = this.getDecorationColection(selection.editor);

    const ranges = this.highlights[selection.file];

    // TODO(kirjs): Handle this better
    const filteredRanges = ranges.filter(r => !monaco.Range.lift(r).containsRange(range) && !range.containsRange(r));

    if (filteredRanges.length === ranges.length) {
      filteredRanges.push(range.toJSON());
    }
    const decorations = filteredRanges.map(rangeToDecoration);

    decorationsCollection.set(decorations);
    this.highlights[selection.file] = filteredRanges;

    this.onchange(this.highlights);
  }
}
