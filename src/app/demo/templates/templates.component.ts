import {Component, OnInit} from '@angular/core';


const baseCode = `
@Component({
  selector: 'my-app', 
  template: \`{{template}}\`
})
class AppComponent {
  name = 'Angularjs'
}
`;

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {


  getCode(code: string) {
    return baseCode.replace('{{template}}', code);
  }

  constructor() {
  }

  ngOnInit() {
  }

}
