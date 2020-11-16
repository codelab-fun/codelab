import { Component, OnInit } from '@angular/core';
import { count } from '../../generate/slides.json';

@Component({
  selector: 'codelab-slides-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {
  public presentation: number[];

  public ngOnInit(): void {
    this.presentation = Array.from({ length: count }, (_, i) => i);
  }
}
