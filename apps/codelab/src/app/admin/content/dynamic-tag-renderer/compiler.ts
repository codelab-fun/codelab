import {
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵtext
} from '@angular/core';
import { CodelabExerciseComponent } from '../../../components/exercise/exercise.component';
import { ExercisePlaygroundEditorComponent } from '../custom-component-editors/codelab-exercise-playground-editor/exercise-playground-editor.component';
import { CodeDemoEditorEditorComponent } from '../custom-component-editors/codelab-code-demo-editor-editor/code-demo-editor.component';
import { DefaultValueAccessor, NgControlStatus, NgModel } from '@angular/forms';
import { CodelabTitleSlideEditorComponent } from '../custom-component-editors/codelab-title-slide-editor/codelab-title-slide-editor.component';
import { CodelabCodeDemoFilePathEditorComponent } from '../custom-component-editors/codelab-code-demo-file-path-editor/codelab-code-demo-file-path-editor.component';
import { CodelabCodeDemoConsoleComponent } from '../custom-component-editors/codelab-code-demo-console/codelab-code-demo-console.component';
import { CodelabImageEditorComponent } from '../custom-component-editors/codelab-image-editor/codelab-image-editor.component';

export function fakeCompileSlide(slide) {
  class GeneratedComponent {}

  let i = 0;
  let constIndex = 0;

  function getConsts(element) {
    return [
      Array.from(element.attributes).flatMap((a: Attr) => [a.name, a.value])
    ];
  }

  function renderElement(element) {
    if (element.nodeType === 3 /* Text Node */) {
      ɵɵtext(i++, element.textContent);
      return;
    }

    const tag = element.tagName.toLowerCase();

    if (element.childNodes.length === 0) {
      ɵɵelementStart(
        i++,
        tag,
        element.attributes.length ? constIndex++ : undefined
      );
      for (const prop in element) {
        if (element.hasOwnProperty(prop)) {
          if (prop.startsWith('(')) {
            ɵɵlistener(prop.slice(1, -1), element[prop]);
          }
        }
      }

      ɵɵelementEnd();
      return;
    }

    ɵɵelementStart(i++, tag);

    for (const child of element.childNodes) {
      renderElement(child);
    }

    ɵɵelementEnd();
  }

  (GeneratedComponent as any).ɵfac = function GeneratedComponent_Factory(t) {
    return new (t || GeneratedComponent)();
  };
  (GeneratedComponent as any).ɵcmp = ɵɵdefineComponent({
    type: GeneratedComponent,
    directives: [
      CodelabExerciseComponent,
      CodelabTitleSlideEditorComponent,
      CodelabCodeDemoFilePathEditorComponent,
      ExercisePlaygroundEditorComponent,
      CodelabCodeDemoConsoleComponent,
      CodeDemoEditorEditorComponent,
      DefaultValueAccessor,
      NgControlStatus,
      NgModel,
      CodelabImageEditorComponent
    ],
    consts: getConsts(slide),
    selectors: [['generated']],
    decls: 300,
    vars: 0,
    template: function GeneratedComponent_Template(rf, ctx) {
      if (rf & 1) {
        renderElement(slide);
      }
    }
  });

  return GeneratedComponent;
}
