import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'slides-single-cell',
  templateUrl: './single-cell.component.html',
  styleUrls: ['./single-cell.component.css']
})
export class SingleCellComponent implements OnInit {
  @Input() single = true;

  constructor() {}

  ngOnInit() {}
}
