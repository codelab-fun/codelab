import { Component, Input, OnInit } from '@angular/core';
import { WebAssemblyTestConfig } from '../runners/wasm-test-runner/wasm-test-runner.component';
import { GridConfig } from './grid/grid.component';

@Component({
  selector: 'slides-viz',
  templateUrl: './viz.component.html',
  styleUrls: ['./viz.component.css']
})
export class VizComponent implements OnInit {
  @Input() config: WebAssemblyTestConfig;
  @Input() test;

  ngOnInit() {}
}
