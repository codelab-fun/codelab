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
  // Todo: is now unsupported https://github.com/troy351/emmet-monaco-es/issues/3
  private emmet: any;
  private subscription: IDisposable;

  constructor(@Self() private editorInjector: CodeDemoEditorInjector) {}

  ngAfterViewInit(): void {
    const editor = this.editorInjector.editor;
    this.subscription = editor.onDidChangeModelLanguage(
      (event: IModelLanguageChangedEvent) =>
        this.onChangeLanguageEventHandler(event)
    );

    const model = editor.getModel();
    const language = model && model['_languageIdentifier'].language;
    if (language) {
      this.onChangeLanguageEventHandler({ oldLanguage: undefined, newLanguage: language })
    }
  }

  ngOnDestroy(): void {
    this.deactivateEmmet();
    if (this.subscription) {
      this.subscription.dispose();
      this.subscription = null;
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
    const editor = this.editorInjector.editor;
    if (language === Languages.html) {
      this.emmet = emmetHTML(editor, monaco);
    }

    if (language === Languages.css) {
      this.emmet = emmetCSS(editor, monaco);
    }
  }

  private deactivateEmmet() {
    console.warn(
      `Emmet cannot be deactivated until https://github.com/troy351/emmet-monaco-es/issues/3 is completed.`
    );
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
