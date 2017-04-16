import {Component, Input} from '@angular/core';
import {ExerciseConfig} from '../interfaces/exercise-config';
import {MonacoConfigService} from 'app/exercise/services/monaco-config.service';


@Component({
  selector: 'app-exercise',
  templateUrl: 'exercise.component.html',
  styleUrls: ['exercise.component.css']
})
export class ExerciseComponent {
  @Input() public config: ExerciseConfig;
  running = false;

  ngOnInit(): void {
    this.monacoConfig.createFileModels(this.config.files);
  }

  onTestUpdate(event) {
    if (!event.data || !event.data.type) {
      return;
    }

    if (event.data.type === 'testList') {
      this.config.tests = event.data.tests.map(test => ({
        title: test
      }));
    }

    if (event.data.type === 'testEnd') {
      this.running = false;
    }

    if (event.data.type === 'testResult') {
      this.config.tests = this.config.tests.map(test => {
        if (test.title === event.data.test.title) {
          test.pass = event.data.pass;
          test.result = event.data.result;
        }
        return test;
      });
    }
  }

  onChanges(change) {
    this.config = {
      ...this.config,
      files: this.config.files.map(file => file === change.file ? {...file, code: change.code} : file)
    };
  }

  constructor(private monacoConfig: MonacoConfigService) {

  }
}
