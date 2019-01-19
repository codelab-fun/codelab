import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'preview-terminal-window',
  templateUrl: './terminal-window.component.html',
  styleUrls: ['./terminal-window.component.css']
})
export class TerminalWindowComponent implements OnInit {
  @Input() height = '';

  constructor() {}

  ngOnInit() {}
}
