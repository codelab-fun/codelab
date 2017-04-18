import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ng2tsConfig} from '../../../../ng2ts/ng2ts';


@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  exercises = [
    ng2tsConfig.milestones[0].exercises[1],
    ng2tsConfig.milestones[1].exercises[1],
    ng2tsConfig.milestones[1].exercises[2]
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
