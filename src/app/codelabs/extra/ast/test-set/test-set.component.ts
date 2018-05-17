import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'slides-test-set',
  templateUrl: './test-set.component.html',
  styleUrls: ['./test-set.component.css']
})
export class TestSetComponent implements OnInit {
  @Input() files = [];
  @Input() fontSize = 30;
  @Input() showAst = false;
}
