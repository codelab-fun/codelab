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
      const idIndex = attrs.findIndex(n => n === ID_ATTR_NAME);
      const milestineIndex = attrs.findIndex(n => n === MILESTONE_ATTR_NAME);
      slide = {
        id: idIndex !== -1 ? attrs[idIndex + 1] : undefined,
        milestone:
          milestineIndex !== -1 ? attrs[milestineIndex + 1] : undefined,
        template
      };
      // Old renderer
    } else {
      const attrs = (template as any)._def.element.template.nodes[0].element
        .attrs;
      const idAttr = attrs.find(([, name]) => name === ID_ATTR_NAME);
      const milestoneAttr = attrs.find(
        ([, name]) => name === MILESTONE_ATTR_NAME
      );
      slide = {
        id: idAttr && idAttr[2],
        milestone: milestoneAttr && milestoneAttr[2],
        template
      };
    }

    presentation.addSlide(slide);
  }
}
