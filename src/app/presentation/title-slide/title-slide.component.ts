import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title-slide',
  templateUrl: './title-slide.component.html',
  styleUrls: ['./title-slide.component.css']
})
export class TitleSlideComponent {
  @Input() title: string;
  @Input() description: string;
  @Input() prereqs: string;
}
