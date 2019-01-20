import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'kirjs-svg-demo',
  templateUrl: './svg-demo.component.html',
  styleUrls: ['./svg-demo.component.css']
})
export class SvgDemoComponent implements OnInit {
  code: string;

  @Input() fontSize;
  @Input('code')
  set codeInput(value) {
    this.code = '<svg>\n' + value + '\n</svg>';
  }

  ngOnInit() {}
}
