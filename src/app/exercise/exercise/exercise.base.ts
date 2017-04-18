import {Input, OnDestroy} from '@angular/core';
import {ExerciseConfig} from '../interfaces/exercise-config';
import {MonacoConfigService} from 'app/exercise/services/monaco-config.service';
import {SlideComponent} from '../../presentation/slide/slide.component';
import {Subscription} from 'rxjs/Subscription';

export class ExerciseBase implements OnDestroy {
  @Input() public config: ExerciseConfig;
  running = false;
  private onActiveUsubscribe: Subscription;


  loadModels() {
    this.monacoConfig.createFileModels(this.config.files);
  }

  ngOnDestroy(): void {
    this.onActiveUsubscribe.unsubscribe();
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

  toggleFile(toggledFile) {
    this.config = {
      ...this.config,
      files: this.config.files.map(file => file === toggledFile ? {...file, collapsed: !file.collapsed} : file)
    };
  }

  loadSolution(solutionFile) {
    this.config = {
      ...this.config,
      files: this.config.files.map(file => file === solutionFile ? {...file, code: file.solution} : file)
    };
  }

  onCodeChanges(change) {
    this.config = {
      ...this.config,
      files: this.config.files.map(file => file === change.file ? {...file, code: change.code} : file)
    };
  }

  constructor(public slide: SlideComponent, private monacoConfig: MonacoConfigService) {
    this.onActiveUsubscribe = slide.onActive.filter(a => a).subscribe(() => {
      console.log('ACTIVE');
      slide.disableShortcuts();
      slide.disableResize();
      this.loadModels();
    });
  }
}
