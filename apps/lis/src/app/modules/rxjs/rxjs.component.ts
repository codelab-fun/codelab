import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'codelab-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit {

  code: Record<string, string> = {
    'index.html': 'Lol',
    'bootstrap.ts': `
import { Injector } from '@angular/core';

console.log(11230);
     `
  };

  constructor() { }

  ngOnInit() {
  }

}
