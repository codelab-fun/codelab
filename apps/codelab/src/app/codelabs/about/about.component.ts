import { Component, OnInit } from '@angular/core';

declare const require;
@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  code = {
    fakeTypes: require('!!raw-loader!./samples/fake-types.d.ts.not-really')
  };
  constructor() {}

  ngOnInit() {}
}
