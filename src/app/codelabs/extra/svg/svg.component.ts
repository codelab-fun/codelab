import { Component } from '@angular/core';
import { bootstrap, builder, exercise, stylesheet } from '../../../exercise/helpers/helpers';

declare const require;

@Component({
  selector: 'slides-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.css']
})
export class SvgComponent {
  fontSize = 20;

  code = {
    circle:
      `<circle cx="200"
  cy="200"
  r="150"
  fill="pink"
  stroke="black"
  stroke-width="20">
</circle>`,

    ellipse:
      `<ellipse cx="300"
        cy="175"
        rx="240"
        ry="140"
        fill="pink"
        stroke="black"
        stroke-width="20"/>`,
    rect:
      `<rect x="100"
  width="200"
  y="100"
  height="200"
  fill="pink"
  stroke="black"
  stroke-width="20">
</rect>`,

    line:
      `<line x1="100"
  x2="300"
  y1="300"
  y2="100"
  stroke="pink"
  stroke-width="20">
</line>`,

    text:
      `<text x=20
  y="400"
  font-size="400"
  fill="pink"
  stroke="black"
  stroke-width=10>
LOL❤
</text>`,

    group:
      `<g style="transform: translate(200px, 200px)">
  <circle r=180 fill="pink"></circle>
  <text fill="pink"
    font-size="200px"
    stroke="black"
    stroke-width="4"
   >LOL</text>
</g>
`,
    polygon:
      `<polygon points="200,10 250,190 160,310 400,200"
  fill="pink"
  stroke="black"
  stroke-width="20"/>`,

    path:
      `<path d="M 40 220 L 200 20, 550 130 Z"
    fill="pink"
    stroke="black"
    stroke-width=20
    />
`,

    clip:
      `<defs>
  <clipPath id="myClip">
    <circle cx="230" cy="110" r="100"/>
  </clipPath>
</defs>

<path d="M 40 220 L 200 20, 550 130 Z"
    fill="pink"
     clip-path="url(#myClip)"
    stroke="black"
    stroke-width=20
    />
`,


    angular: `<!--  viewBox="0 0 250 250" --><style type="text/css">
	.st0{fill:#DD0031;}
	.st1{fill:#C3002F;}
	.st2{fill:#FFFFFF;}
</style>
<g>
	<polygon class="st0" points="125,30 125,30 125,30 31.9,63.2 46.1,186.3 125,230 125,230 125,230 203.9,186.3 218.1,63.2 	"/>
	<polygon class="st1" points="125,30 125,52.2 125,52.1 125,153.4 125,153.4 125,230 125,230 203.9,186.3 218.1,63.2 125,30 	"/>
	<path class="st2" d="M125,52.1L66.8,182.6h0h21.7h0l11.7-29.2h49.4l11.7,29.2h0h21.7h0L125,52.1L125,52.1L125,52.1L125,52.1
		L125,52.1z M142,135.4H108l17-40.9L142,135.4z"/>
</g>

`,
    clip2:
      `<defs>
  <clipPath id="myClip">
  <text x=100
  y="160"
  font-size="200">
  LOL
  </text>
  </clipPath>
</defs>

<path d="M 40 220 L 200 20, 550 130 Z"
    fill="pink"
     clip-path="url(#myClip)"
    stroke="black"
    stroke-width=20
    />
`,
    textPath:
      `<defs>
  <path d="M 40 220 L 200 20, 550 130 Z"
      id="p"/>
</defs>

<text font-size="20">
    <textPath xLink href="#p">
        SVG❤️Angular🔥SVG❤️Angular🔥SVG❤️Angular🔥SVG❤️Angular🔥SVG❤️Angular🔥SVG❤️Angular🔥SVG❤️Angular🔥SVG❤️Angular🔥SVG❤️Angular🔥
    </textPath>
</text>
`,
    linewrap:
      `<text font-size="20" y="100">
    Go Angular Oslo! Go Angular Oslo! Go Angular Oslo! Go Angular Oslo!
    Go Angular Oslo! Go Angular Oslo! Go Angular Oslo! Go Angular Oslo!
    Go Angular Oslo! Go Angular Oslo!
</text>`, foreignObject: `<circle cx="200" cy="200" r="150" fill="pink" stroke="black" stroke-width="20">
</circle>
<foreignObject>
  <h2 style = "width: 300px">
      Go Angular Oslo! Go Angular Oslo! Go Angular Oslo! Go Angular Oslo!
      Go Angular Oslo! Go Angular Oslo! Go Angular Oslo! Go Angular Oslo!
      Go Angular Oslo! Go Angular Oslo!
  </h2>
</foreignObject>`,
    attrVsProp: `
      // <rect [x]=123>
      rect.x = 123;

      // <rect [attr.x]=123>
      rect.setAttribute('x',  123);
`,
    createElement: `
      // <text></text>
      document.createElement("text");

      // <svg:text></svg:text>
      document.createElementNS
        ("http://www.w3.org/2000/svg", "text");
`,

    component1: [
      exercise('app.component', require('!!raw-loader!./samples/attr/app.component.ts')),
      exercise('app.module', require('!!raw-loader!./samples/app.module.ts')),
      bootstrap('main', builder.bootstrap()),
      stylesheet(require('!!raw-loader!./samples/style.css')),
    ],

    chart: [
      exercise('app.component', require('!!raw-loader!./samples/chart/app.component.ts')),
      exercise('app.module', require('!!raw-loader!./samples/app.module.ts')),
      bootstrap('main', builder.bootstrap()),
      stylesheet(require('!!raw-loader!./samples/style.css')),
    ],

    chart2: [
      exercise('app.component', require('!!raw-loader!./samples/chart2/app.component.ts'),
        require('!!raw-loader!./samples/chart2/app.component.solved.ts')),
      exercise('ticks.component', require('!!raw-loader!./samples/chart2/ticks.component.ts')),
      exercise('app.module', require('!!raw-loader!./samples/chart2/app.module.ts')),
      bootstrap('main', builder.bootstrap()),
      stylesheet(require('!!raw-loader!./samples/style.css')),
    ],

    chart3: [
      exercise('app.component', require('!!raw-loader!./samples/chart4/app.component.ts'),
        require('!!raw-loader!./samples/chart4/app.component.solved.ts')),
      exercise('ticks.component', require('!!raw-loader!./samples/chart4/ticks.component.ts')),
      exercise('app.module', require('!!raw-loader!./samples/chart4/app.module.ts')),
      bootstrap('main', builder.bootstrap()),
      stylesheet(require('!!raw-loader!./samples/style.css')),
    ],

  };


  constructor() {
  }

}


