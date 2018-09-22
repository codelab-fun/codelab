import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'slides-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.css']
})
export class ObjectComponent implements OnInit {
  @Input() data: Array<any>;
  @Input() showMeta = true;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  init() {

    this.cdr.detectChanges();
  };

}
