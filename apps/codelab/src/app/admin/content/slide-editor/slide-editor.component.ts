import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'slides-slide-editor',
  templateUrl: './slide-editor.component.html',
  styleUrls: ['./slide-editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SlideEditorComponent implements OnInit, OnChanges {
  @Input() slide;
  @Output() updateSlide = new EventEmitter();

  blocks = [];

  ngOnChanges() {
    if (JSON.stringify(this.generateBlocks()) !== JSON.stringify(this.blocks)) {
      this.blocks = this.generateBlocks();
    }
  }

  generateBlocks() {
    let current = { type: '', code: '' };
    const blocks = [current];

    for (const tag of this.slide.childNodes) {
      if (tag.nodeType === 3 && tag.textContent.trim() === '') {
        continue;
      }

      const type =
        tag.tagName && tag.tagName.toLowerCase().startsWith('codelab')
          ? 'custom'
          : 'html';

      if (current.type !== type || type === 'custom') {
        current = { type, code: '' };
        blocks.push(current);
      }

      current.code += (tag.outerHTML || tag.textContent).trim();
    }

    return blocks;
  }

  ngOnInit() {
    this.blocks = this.generateBlocks();
  }

  updateAttr(id: string, value: any) {
    this.slide.setAttribute(id, value);
    this.updateSlide.emit(this.slide);
  }

  updateHtml(i: number, html: string) {
    this.blocks[i].code = html.trim();
    const innerHTML = this.blocks.map(b => b.code).join('\n');
    this.slide.innerHTML = innerHTML;
    this.updateSlide.emit(this.slide);
  }

  addP() {
    this.blocks.push({ type: 'html', code: '<p>lol</p>' });
  }

  addCode() {
    this.blocks.push({
      type: 'custom',
      code: '<codelab-code-demo-editor>//code</codelab-code-demo-editor>'
    });
  }

  addImage() {
    this.blocks.push({
      type: 'custom',
      code: '<codelab-image></codelab-image>'
    });
  }

  removeBlock(i: number) {
    this.blocks.splice(i, 1);
  }
}
