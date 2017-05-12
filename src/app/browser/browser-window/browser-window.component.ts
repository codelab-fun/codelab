import { Component, OnInit, Input, SimpleChanges} from '@angular/core';

@Component({
  selector: 'slides-browser-window',
  templateUrl: './browser-window.component.html',
  styleUrls: ['./browser-window.component.css']
})
export class BrowserWindowComponent implements OnInit {
  @Input() width = '496px';
  @Input() height = '';
  constructor() { }

  ngOnInit() {
  }

}
