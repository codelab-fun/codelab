import { Directive, ElementRef, Input, TemplateRef } from '@angular/core';
import { PresentationComponentV2 } from '@angular-presentation/presentation/src/lib/v2/pres/presentation-componentv2.component';

@Directive({
  selector: '[slide]'
})
export class SlideDirective {
  @Input() class;

  constructor(
    private presentation: PresentationComponentV2,
    private template: TemplateRef<any>,
    private el: ElementRef) {
    const attr = (template as any)._def.element.template.nodes[0].element.attrs.find(([_, name]) => name === 'id');
    const id = attr && attr[2];
    presentation.addSlide({
      id: id,
      template
    })
  }


}
