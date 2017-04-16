import {Component} from '@angular/core';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-autorun',
  templateUrl: 'autorun.component.html',
  styleUrls: ['autorun.component.css']
})
export class AutorunComponent {
  autorun: boolean;
  running: boolean;
  private stateSubscription: Subscription;

  constructor() {

  }

  ngOnInit() {
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

  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
  }


  endRun() {
    // TODO
    //this.state.endTests();
  }

  toggleAutorun() {
    // TODO
    //this.state.toggleAutorun();
  }

  run() {
    // TODO
    // if (!this.running) {
    //   this.state.run();
    // }
  }
}
