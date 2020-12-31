import {
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵtext
} from '@angular/core';
import { CodelabExerciseComponent } from '../../../components/exercise/exercise.component';
import { ExercisePlaygroundEditorComponent } from '../custom-component-editors/exercise-playground-editor/exercise-playground-editor.component';
import { CodeDemoEditorEditorComponent } from '../custom-component-editors/code-demo-editor-editor/code-demo-editor.component';
import { DefaultValueAccessor, NgControlStatus, NgModel } from '@angular/forms';

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

          console.log(prop);
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
      ExercisePlaygroundEditorComponent,
      CodeDemoEditorEditorComponent,
      DefaultValueAccessor,
      NgControlStatus,
      NgModel
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
