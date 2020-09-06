import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { Result, RunResult, WebAssemblyService } from '../web-assembly.service';

@Component({
  selector: 'kirjs-webassembly-runner',
  templateUrl: './webassembly-runner.component.html',
  styleUrls: ['./webassembly-runner.component.css']
})
export class WebassemblyRunnerComponent implements OnChanges {
  @Input() webAssemblyCode: string;
  @Input() jsCode: string;
  @Input() width = 400;
  @Input() height = 1000;

  @ViewChild('canvas', { static: true }) canvas;

  readonly result$ = new Subject<Result<RunResult>>();

  constructor(private readonly webAssemblyService: WebAssemblyService) {}

  async ngOnChanges(changes) {
    const canvas = this.canvas.nativeElement;
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    this.webAssemblyService
      .run(this.webAssemblyCode, this.jsCode, canvas)
      .subscribe(this.result$);
  }
}
