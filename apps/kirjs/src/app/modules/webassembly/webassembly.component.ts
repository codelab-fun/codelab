import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kirjs-webassembly',
  templateUrl: './webassembly.component.html',
  styleUrls: ['./webassembly.component.css']
})
export class WebassemblyComponent implements OnInit {

  code = {
    simple: {
      wa: `(module
  (func $result (result i32)
    i32.const 42
  )
  (export "add" (func $result))
)`
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
