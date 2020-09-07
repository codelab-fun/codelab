import { Component, Input, OnInit } from '@angular/core';
import { Result } from '../web-assembly.service';

@Component({
  selector: 'slides-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit {
  @Input() result: Result<string>;

  constructor() {}

  ngOnInit() {}
}
