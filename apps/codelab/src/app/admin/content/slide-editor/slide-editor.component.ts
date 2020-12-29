import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'slides-slide-editor',
  templateUrl: './slide-editor.component.html',
  styleUrls: ['./slide-editor.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SlideEditorComponent implements OnInit {
  @Input() slide;
  @Output() updateSlide = new EventEmitter();

  blocks = [];

  generateBlocks() {
    let current = { type: '', code: '' };
    const blocks = [];

    for (const tag of this.slide.slide.childNodes) {
      const type =
        tag.tagName && tag.tagName.toLowerCase().startsWith('codelab')
          ? 'custom'
          : 'html';
      if (current.type !== type) {
        current = { type, code: '' };
        blocks.push(current);
      }

      current.code += (tag.outerHTML || tag.textContent).trim();
    }

    this.blocks = blocks;
  }

  ngOnInit() {
    this.generateBlocks();
  }

  updateAttr(id: string, value: any) {
    this.slide.slide.setAttribute(id, value);
    this.updateSlide.emit(this.slide.slide);
  }

  updateHtml(i: number, html: string) {
    this.blocks[i].code = html.trim();
    const innerHTML = this.blocks.map(b => b.code).join('\n');
    this.slide.slide.innerHTML = innerHTML;
    this.updateSlide.emit(this.slide.slide);
  }
}
