import { Component, OnInit } from '@angular/core';
import { NewExerciseComponent } from '../../new-exercise/new-exercise.component';

@Component({
  selector: 'slides-angular-runner',
  templateUrl: './angular-runner.component.html',
  styleUrls: ['./angular-runner.component.css']
})
export class AngularRunnerComponent implements OnInit {

  constructor(public parent: NewExerciseComponent) {
  }

  onTestUpdate(event) {

  }

  ngOnInit() {
  }

}
