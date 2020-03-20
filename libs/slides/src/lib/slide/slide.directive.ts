import { Directive, Input, TemplateRef } from '@angular/core';
import { SlidesDeckComponent } from '../deck/deck.component';

const ID_ATTR_NAME = 'id';
const MILESTONE_ATTR_NAME = 'milestone';

@Directive({
  selector: '[slide]'
})
export class SlideDirective {
  @Input() class;

  constructor(
    private presentation: SlidesDeckComponent,
    private template: TemplateRef<any>
  ) {
    let slide;

    // TODO: Move milestone extraction to the codelab.
    // Ivy
    if ((template as any)._declarationTContainer) {
      const attrs = (template as any)._declarationTContainer.attrs || [];
      const indexPredicate = n => n === ID_ATTR_NAME;
      const idIndex = attrs.findIndex(indexPredicate);
      const milestoneIndex = attrs.findIndex(indexPredicate);
      slide = {
        id: idIndex !== -1 ? attrs[idIndex + 1] : undefined,
        milestone:
          milestoneIndex !== -1 ? attrs[milestoneIndex + 1] : undefined,
        template
      };
      // Old renderer
    } else {
      const attrs = (template as any)._def.element.template.nodes[0].element
        .attrs;
      const attrPredicate = ([_, name]: string[]): boolean =>
        name === ID_ATTR_NAME;
      const idAttr = attrs.find(attrPredicate);
      const milestoneAttr = attrs.find(attrPredicate);
      slide = {
        id: idAttr && idAttr[2],
        milestone: milestoneAttr && milestoneAttr[2],
        template
      };
    }

    presentation.addSlide(slide);
  }
}
