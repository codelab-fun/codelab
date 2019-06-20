import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'kirjs-to-read',
  templateUrl: './to-read.component.html',
  styleUrls: ['./to-read.component.css']
})
export class ToReadComponent implements OnInit {
  @Input() author: string;
  @Input() title: string;
  constructor() {}

  ngOnInit() {}
}
