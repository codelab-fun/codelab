import {
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext
} from '@angular/core';
import { CodelabExerciseComponent } from '../../../components/exercise/exercise.component';
import { ExercisePlaygroundEditorComponent } from '../custom-component-editors/exercise-playground-editor/exercise-playground-editor.component';
import { CodelabExercisePlaygroundComponent } from '../../../components/exercise-playground/codelab-exercise-playground.component';

export function fakeCompileSlide(slide) {
  class GeneratedComponent {}

  let i = 0;

  function renderElement(element) {
    if (element.nodeType === 3 /* Text Node */) {
      ɵɵtext(i++, element.textContent);
      return;
    }

    if (element.childNodes.length === 0) {
      ɵɵelement(i++, element.tagName.toLowerCase());
      return;
    }

    ɵɵelementStart(i++, element.tagName);

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
      CodelabExercisePlaygroundComponent
    ],
    selectors: [['slides-dynamic-tag-renderer']],
    decls: 300,
    vars: 0,
    template: function GeneratedComponent_Template(rf, ctx) {
      if (rf & 1) {
        renderElement(slide);
        console.log(slide);
      }
    }
  });

  return GeneratedComponent;
}
