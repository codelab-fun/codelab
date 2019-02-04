import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit
} from '@angular/core';
import * as interact from 'interactjs';
import * as domtoimage from 'dom-to-image';
import * as JSZip from 'jszip';
import * as saveAs from 'file-saver';

@Component({
  selector: 'kirjs-ii',
  templateUrl: './ii.component.html',
  styleUrls: ['./ii.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IiComponent implements OnInit {
  items: any[];
  src?: string;

  constructor(
    private readonly el: ElementRef,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.src = localStorage.getItem('pic');
    this.items = JSON.parse(localStorage.getItem('items') || '[]');
  }

  ngOnInit() {}

  loadImage(e) {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent) => {
      this.src = e.target['result'];
      localStorage.setItem('pic', this.src);
    };

    reader.readAsDataURL(e.target.files[0]);
  }

  newBox(e) {
    const parent = this.el.nativeElement.querySelector('.parent');
    const y = e.clientY - parent.offsetTop;
    const x = e.clientX - parent.offsetLeft;

    const savedItem = {
      left: x,
      top: y,
      width: 100,
      height: 40
    };
    this.items.push(savedItem);
    this.displayBox(savedItem);
    this.saveState();
  }

  saveState() {
    console.log(this.items);
    localStorage.setItem('items', JSON.stringify(this.items));
  }

  displayBox(savedItem) {
    const parent = this.el.nativeElement.querySelector('.parent');
    const item = document.createElement('div');
    item.style.position = 'absolute';
    item.style.left = savedItem.left + 'px';
    item.className = 'item';
    item.style.top = savedItem.top + 'px';
    item.style.width = savedItem.width + 'px';
    item.style.height = savedItem.height + 'px';
    parent.appendChild(item);
    this.makeDraggable(item, savedItem);
  }

  async generate() {
    const parent = this.el.nativeElement.querySelector('.parent');

    const items = parent.querySelectorAll('.item');
    items.forEach(i => {
      i.style.display = 'none';
    });
    const questions = [];
    const answer = await domtoimage.toPng(parent);
    let question = '';

    for (let i in items) {
      if (items.hasOwnProperty(i)) {
        items[i].style.display = 'block';
        questions[i] = await domtoimage.toPng(parent);
        question += `<img src="./q${i}.png">;<img src="./a.png">\n`;
        items[i].style.display = 'none';
      }
    }

    const zip = new JSZip();
    zip.file('deck.csv', question);

    zip.file('a.png', answer.slice(22), { base64: true });

    questions.forEach((q, i) => {
      zip.file(`q${i}.png`, q.slice(22), { base64: true });
    });

    const content = await zip.generateAsync({ type: 'blob' });

    // see FileSaver.js
    saveAs(content, 'anki-cards.zip');

    parent.querySelectorAll('.item').forEach(i => {
      i.style.display = 'block';
    });
  }

  makeDraggable(item, savedItem) {
    (interact as any)(item)
      .draggable({
        onmove: event => {
          const target = event.target,
            // keep the dragged position in the data-x/data-y attributes
            x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
            y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

          // translate the element
          target.style.webkitTransform = target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';

          // update the posiion attributes
          target.setAttribute('data-x', x);
          target.setAttribute('data-y', y);
          savedItem.left = Number(target.style.left.replace('px', '')) + x;
          savedItem.top = Number(target.style.top.replace('px', '')) + y;
          this.saveState();
        },
        restrict: {
          restriction: 'parent',
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        }
      })
      .resizable({
        // resize from all edges and corners
        edges: { left: true, right: true, bottom: true, top: true },

        // keep the edges inside the parent
        restrictEdges: {
          outer: 'parent',
          endOnly: true
        },

        // minimum size
        restrictSize: {
          min: { width: 100, height: 20 }
        },

        inertia: true
      } as any)
      .on('resizemove', (event: any) => {
        const target = event.target;
        let x = parseFloat(target.getAttribute('data-x')) || 0;
        let y = parseFloat(target.getAttribute('data-y')) || 0;

        // update the element's style
        target.style.width = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';

        // translate when resizing from top or left edges
        x += event.deltaRect.left;
        y += event.deltaRect.top;

        target.style.webkitTransform = target.style.transform =
          'translate(' + x + 'px,' + y + 'px)';

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
        savedItem.width = event.rect.width;
        savedItem.height = event.rect.height;
        savedItem.left = Number(target.style.left.replace('px', '')) + x;
        savedItem.top = Number(target.style.top.replace('px', '')) + y;
        this.saveState();
      });
  }

  ngAfterViewInit() {
    this.items.forEach(i => this.displayBox(i));
  }
}
