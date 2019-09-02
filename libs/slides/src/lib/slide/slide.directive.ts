import { Directive, Input, TemplateRef } from '@angular/core';
import { SlidesDeckComponent } from '../deck/deck.component';

@Directive({
  selector: '[slide]'
})
export class SlideDirective {
  @Input() class;

  constructor(
    private presentation: SlidesDeckComponent,
    private template: TemplateRef<any>
  ) {
    const attrs = (template as any)._def.element.template.nodes[0].element
      .attrs;
    const idAttr = attrs.find(([, name]) => name === 'id');
    // TODO: Move this to the codelab
    const milestoneAttr = attrs.find(([, name]) => name === 'milestone');

    presentation.addSlide({
      id: idAttr && idAttr[2],
      milestone: milestoneAttr && milestoneAttr[2],
      template
    });
  }
}
