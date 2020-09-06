import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'kirjs-svg-together',
  templateUrl: './svg-together.component.html',
  styleUrls: ['./svg-together.component.css']
})
export class SvgTogetherComponent implements OnInit {
  code = '';
  angularFireList: AngularFireList<any>;
  @Input() fontSize;
  allCode = 'TBD';
  helpers = [
    {
      label: '⭕️',
      code: `<svg>
<circle cx="200"
  opacity="0.5"
  cy="200"
  r="30"
  fill="#ff0000"
  stroke="black"
  stroke-width="2">
</circle>
</svg>`
    },
    {
      label: '⬭',
      code: `<svg>
 <ellipse cx="130"
        cy="175"
        opacity="0.3"
        rx="40"
        ry="20"
        fill="#ff0000"
        stroke="black"
        stroke-width="2"/>
</svg>`
    },
    {
      label: '▭',
      code: `<svg>
<rect x="100"
  width="20"
  opacity="0.3"
  y="100"
  height="20"
  fill="#ff0000"
  stroke="black"
  stroke-width="2">
</rect>
</svg>`
    },
    {
      label: '_',
      code: `<svg>
<line x1="10"
  opacity="0.3"
  x2="30"
  y1="30"
  y2="10"
  stroke="#ff0000"
  stroke-width="2">
</line>
</svg>`
    },
    {
      label: 't',
      code: `<svg>
<text x=20
  y="40"
  opacity="0.3"
  font-size="40"
  fill="#ff0000"
  stroke="black"
  stroke-width=10>
LOL❤
</text>
</svg>`
    },
    {
      label: '☆',
      code: `<svg>
<polygon points="20,10 250,190 160,310 40,20"
  fill="#ff0000"
  opacity="0.3"
  stroke="black"
  stroke-width="2"/>
</svg>`
    },
    {
      label: '⌇',
      code: `<svg>
<path d="M 40 20 L 20 20, 55 130 Z"
    fill="#ff0000"
    opacity="0.3"
    stroke="black"
    stroke-width=1
    />
</svg>`
    }
  ];

  constructor(af: AngularFireDatabase) {
    this.angularFireList = af.list('/svg-together');
    this.angularFireList.snapshotChanges().subscribe(a => {
      this.allCode =
        '<svg>' + a.map(a => a.payload.val()).join('\n') + '</svg>';
    });
    this.reset();
  }

  @Input('code')
  set codeInput(value) {
    this.code = '<svg>\n' + value + '\n</svg>';
  }

  submit() {
    const code = this.code.replace(/<svg>\s+/, '').replace('</svg>', '');
    this.angularFireList.push(code);
    this.reset();
  }

  reset() {
    this.code = `<svg>
  <!--Write your code here-->
</svg>`;
  }

  ngOnInit() {}
}
