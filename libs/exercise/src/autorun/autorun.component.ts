import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'slides-autorun',
  templateUrl: 'autorun.component.html',
  styleUrls: ['autorun.component.css']
})
export class AutorunComponent implements OnInit, OnDestroy {
  autorun: boolean;
  running: boolean;
  private stateSubscription: Subscription;

  constructor() {

  }

  ngOnInit(): void {
    /*
     this.stateSubscription = this.state.update
     .map(d => d.local.autorun)
     .distinctUntilChanged().subscribe(autorun => {
     this.autorun = autorun;
     }
     );

     this.stateSubscription = this.state.update
     .map(d => d.local.running)
     .distinctUntilChanged().subscribe(running => {
     this.running = running;
     }
     );
     */

  }

  ngOnDestroy(): void {
    this.stateSubscription.unsubscribe();
  }


  endRun(): void {
    // TODO
    // this.state.endTests();
  }

  toggleAutorun(): void {
    // TODO
    // this.state.toggleAutorun();
  }

  run(): void {
    // TODO
    // if (!this.running) {
    //   this.state.run();
    // }
  }
}
