import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ng2tsConfig} from '../../../../ng2ts/ng2ts';


console.log(ng2tsConfig.milestones[0].exercises[1]);
@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {


  code = {
    hello: `tooltips = [
 {
  match:'Angular',
  text:'This is Angular',
  fontSize: 40 //optional
 }
];`
  };
  exercises = [
    ng2tsConfig.milestones[0].exercises[1],
    ng2tsConfig.milestones[1].exercises[1],
    ng2tsConfig.milestones[1].exercises[2],
    {
      "name": "TypeScript",
      "runner": "Angular",
      "files": [
        {
          "bootstrap": false,
          "excludeFromTesting": false,
          "type": "typescript",
          "path": "typescript-intro/Codelab.ts",
          "template": "import {Guest} from './Guest';\n\n",
          "moduleName": "typescript-intro/Codelab",
          "code": "import {Guest} from './Guest';\n\n",
          "solution": "import {Guest} from './Guest';\n\nexport class Codelab {\n  constructor(public guests: Guest[]) {\n  }\n\n  getGuestsComing() {\n    return this.guests.filter(guest => guest.coming);\n  }\n}\n\n",
          "after": "export export function evalJs( js ){ return eval(js);}"
        },
        {
          "bootstrap": true,
          "excludeFromTesting": true,
          "type": "typescript",
          "path": "typescript-intro/Main.ts",
          "template": "\nimport {Codelab} from './Codelab';\nimport {Guest} from './Guest';\n\n// Use this file for reference.\nconst guests = [\n  {\n    coming: true,\n    name: `Sir Isaac Newton`\n  },\n  {\n    coming: true,\n    name: `Marie Curie`\n  },\n  {\n    coming: true,\n    name: `Albert Einstein`\n  },\n  {\n    coming: false,\n    name: `Charles Darwin`\n  }];\n\nconst codelab = new Codelab(guests);\n\n// Angular2 is so much better than this:\ndocument.body.innerHTML = '<ul>' +\n  codelab.getGuestsComing().map((guest: Guest) => `<li>${guest.name}</li>`).join('') +\n  '</ul>';\n",
          "moduleName": "typescript-intro/Main",
          "code": "\nimport {Codelab} from './Codelab';\nimport {Guest} from './Guest';\n\n// Use this file for reference.\nconst guests = [\n  {\n    coming: true,\n    name: `Sir Isaac Newton`\n  },\n  {\n    coming: true,\n    name: `Marie Curie`\n  },\n  {\n    coming: true,\n    name: `Albert Einstein`\n  },\n  {\n    coming: false,\n    name: `Charles Darwin`\n  }];\n\nconst codelab = new Codelab(guests);\n\n// Angular2 is so much better than this:\ndocument.body.innerHTML = '<ul>' +\n  codelab.getGuestsComing().map((guest: Guest) => `<li>${guest.name}</li>`).join('') +\n  '</ul>';\n",
          "solution": "\nimport {Codelab} from './Codelab';\nimport {Guest} from './Guest';\n\n// Use this file for reference.\nconst guests = [\n  {\n    coming: true,\n    name: `Sir Isaac Newton`\n  },\n  {\n    coming: true,\n    name: `Marie Curie`\n  },\n  {\n    coming: true,\n    name: `Albert Einstein`\n  },\n  {\n    coming: false,\n    name: `Charles Darwin`\n  }];\n\nconst codelab = new Codelab(guests);\n\n// Angular2 is so much better than this:\ndocument.body.innerHTML = '<ul>' +\n  codelab.getGuestsComing().map((guest: Guest) => `<li>${guest.name}</li>`).join('') +\n  '</ul>';\n",
          "after": "export export function evalJs( js ){ return eval(js);}"
        }
      ]
    }
  ];

  code = {
    '0':{
      code: `export class Hello {
  constructor(private name: string){}
  hello(){
     const greeting = 'Hello';
		return \`\${greeting} ${name}!\`
  }
}
`,
      readonly:true,
      path:'hello.ts',
      type:'typescript'
    },
    '1':{
      code: `import {Hello} from 'Hello';
console.log(new Hello(2016).hello())`,
      readonly:true,
      path:'main.ts',
      type:'typescript'
    }
  };

  constructor(private route: ActivatedRoute) {
  }

  activeSlideId = 0;

  ngOnInit() {
    let id = Number(this.route.snapshot.params['id']);
    if (id) {
      this.activeSlideId = id;
    }
  }

}
