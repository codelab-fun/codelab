import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'codelab-slides-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {
  public presentation: number[];

  public ngOnInit(): void {
    this.presentation = Array.from({ length: 29 }, (_, i) => i);
  }
}
