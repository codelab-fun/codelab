import { Directive, Input, TemplateRef } from '@angular/core';
import { SlidesDeckComponent } from '@angular-presentation/slides/src/lib/deck/deck.component';

@Directive({
  selector: '[slide]'
})
export class SlideDirective {
  @Input() class;

  constructor(
    private presentation: SlidesDeckComponent,
    private template: TemplateRef<any>) {
    const attr = (template as any)._def.element.template.nodes[0].element.attrs.find(([_, name]) => name === 'id');
    const id = attr && attr[2];
    presentation.addSlide({
      id: id,
      template
    })
  }


}
