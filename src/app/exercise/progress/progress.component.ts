import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'slides-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {
  @Input() max: number;
  @Input() current: number;

  ngOnInit() {
    console.log(this.max, this.current);
  }

}
