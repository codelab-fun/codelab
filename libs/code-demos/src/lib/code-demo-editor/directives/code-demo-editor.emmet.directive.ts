import { AfterViewInit, Directive, Self } from '@angular/core';
import { emmetHTML, emmetCSS } from 'emmet-monaco-es';
import { editor, IDisposable } from 'monaco-editor';
import { CodeDemoEditorInjector } from '../code-demo-editor.injector';
import IModelLanguageChangedEvent = editor.IModelLanguageChangedEvent;

declare const monaco: any;

enum Languages {
  css = 'css',
  html = 'html'
}

@Directive({
  selector: 'code-demo-editor, code-demo-editor-from-model'
})
export class CodeDemoEditorEmmetDirective implements AfterViewInit {
  private emmetDisposeFn: Function;
  private subscription: IDisposable;

  constructor(@Self() private editorInjector: CodeDemoEditorInjector) {}

  ngAfterViewInit(): void {
    const editor = this.editorInjector.editor;
    this.subscription = editor.onDidChangeModel(() =>
      this.onChangeModel()
    );
    this.onChangeModel();
  }

  ngOnDestroy(): void {
    this.deactivateEmmet();
    if (this.subscription) {
      this.subscription.dispose();
      this.subscription = null;
    }
  }

  private onChangeModel() {
    const editor = this.editorInjector.editor;
    const model = editor.getModel();
    const language = model && model['_languageIdentifier'].language;
    if (language) {
      this.onChangeLanguageEventHandler({
        oldLanguage: undefined,
        newLanguage: language
      });
    }
  }

  private onChangeLanguageEventHandler(event: IModelLanguageChangedEvent) {
    const isHtmlDeactivated = isDeactivatedLanguage(Languages.html, event);
    const isCssDeactivated = isDeactivatedLanguage(Languages.css, event);
    if (isHtmlDeactivated || isCssDeactivated) {
      this.deactivateEmmet();
    }

    const isHtmlActivated = isActivatedLanguage(Languages.html, event);
    if (isHtmlActivated) {
      this.activateEmmetWith(Languages.html);
    }

    const isCssActivated = isActivatedLanguage(Languages.css, event);
    if (isCssActivated) {
      this.activateEmmetWith(Languages.css);
    }
  }

  private activateEmmetWith(language: Languages) {
    console.log(`Emmet activated with`, language);
    const editor = this.editorInjector.editor;
    if (language === Languages.html) {
      this.emmetDisposeFn = emmetHTML(editor, monaco);
    }

    if (language === Languages.css) {
      this.emmetDisposeFn = emmetCSS(editor, monaco);
    }
  }

  private deactivateEmmet() {
    if (this.emmetDisposeFn) {
      this.emmetDisposeFn();
      this.emmetDisposeFn = null;
    }
  }
}

function isActivatedLanguage(
  language: string,
  event: IModelLanguageChangedEvent
): boolean {
  return (
    event.newLanguage !== event.oldLanguage && event.newLanguage === language
  );
}

function isDeactivatedLanguage(
  language: string,
  event: IModelLanguageChangedEvent
): boolean {
  return (
    event.newLanguage !== event.oldLanguage && event.oldLanguage === language
  );
}
