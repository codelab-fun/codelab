import { Component, OnInit } from '@angular/core';
import { ExerciseComponent } from '../../exercise/exercise.component';

@Component({
  selector: 'slides-angular-runner',
  templateUrl: './angular-runner.component.html',
  styleUrls: ['./angular-runner.component.css']
})
export class AngularRunnerComponent implements OnInit {

  constructor(public parent: ExerciseComponent) {
  }

  onTestUpdate(event) {

  }

  ngOnInit() {
  }

}
