import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'slides-svg-together',
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
  opacity="0.3"
  cy="200"
  r="150"
  fill="pink"
  stroke="black"
  stroke-width="20">
</circle>
</svg>`,
    },
    {
      label: '⬭',
      code: `<svg>
 <ellipse cx="300"
        cy="175"
        opacity="0.3"
        rx="240"
        ry="140"
        fill="pink"
        stroke="black"
        stroke-width="20"/>
</svg>`,
    },
    {
      label: '▭',
      code: `<svg>
<rect x="100"
  width="200"
  opacity="0.3"
  y="100"
  height="200"
  fill="pink"
  stroke="black"
  stroke-width="20">
</rect>
</svg>`,
    },
    {
      label: '_',
      code: `<svg>
<line x1="100"
  opacity="0.3"
  x2="300"
  y1="300"
  y2="100"
  stroke="pink"
  stroke-width="20">
</line>
</svg>`
    },
    {
      label: 't',
      code: `<svg>
<text x=20
  y="400"
  opacity="0.3"
  font-size="400"
  fill="pink"
  stroke="black"
  stroke-width=10>
LOL❤
</text>
</svg>`,
    },
    {
      label: '☆',
      code: `<svg>
<polygon points="200,10 250,190 160,310 400,200"
  fill="pink"
  opacity="0.3"
  stroke="black"
  stroke-width="20"/>
</svg>`,
    },
    {
      label: '⌇',
      code: `<svg>
<path d="M 40 220 L 200 20, 550 130 Z"
    fill="pink"
    opacity="0.3"
    stroke="black"
    stroke-width=20
    />
</svg>`,
    }
  ];

  constructor(af: AngularFireDatabase) {
    this.angularFireList = af.list('svg-together');
    this.angularFireList.snapshotChanges().subscribe((a) => {
      this.allCode = '<svg>' + a.map(a => a.payload.val()).join('\n') + '</svg>';
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

  }

  reset() {
    this.code = `<svg>
  <!--Write your code here-->
</svg>`;

  }

  ngOnInit() {
  }
}
