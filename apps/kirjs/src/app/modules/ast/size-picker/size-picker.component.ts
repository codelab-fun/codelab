import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'kirjs-size-picker',
  templateUrl: './size-picker.component.html',
  styleUrls: ['./size-picker.component.css']
})
export class SizePickerComponent {
  @Input() size = 28;
  @Input() step = 2;
  @Output() sizeChange = new EventEmitter();
}
