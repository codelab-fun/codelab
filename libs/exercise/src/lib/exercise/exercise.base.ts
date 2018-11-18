import { Input, OnInit } from '@angular/core';
import { ExerciseConfig } from '../interfaces/exercise-config';


import { ActivatedRoute } from '@angular/router';
import { FileConfig } from '../interfaces/file-config';
import * as assert from 'assert';
import { MonacoConfigService } from '../services/monaco-config.service';
import { PresentationComponent } from '../../../../presentation/src/lib/presentation/presentation.component';

export class ExerciseBase implements OnInit {
  @Input() public config: ExerciseConfig;
  running = false;
  solved = false;

  constructor(private monacoConfig: MonacoConfigService,
              private route: ActivatedRoute,
              private presentation: PresentationComponent) {
  }

  loadModels(files: Array<FileConfig>) {
    this.monacoConfig.createFileModels(files);
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
      if (this.config.tests.length && this.config.tests.every(test => test.pass)) {
        const path = this.route.parent.snapshot.routeConfig && this.route.parent.snapshot.routeConfig.path || 'index';
        // TODO(kirjs): Uncooment
        // this.analyticsService.sendEvent('exercise', 'solved', path);
        this.solved = true;
      }
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

  goToNextSlide() {
    this.presentation.nextSlide();
  }

  toggleFile(toggledFile) {
    this.config = {
      ...this.config,
      files: this.config.files.map(file => file === toggledFile ? {...file, opened: !file.opened} : file)
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
      files: this.config.files.map(file => file.path === change.file.path ? {...file, code: change.code} : file)
    };
  }

  ngOnInit() {
    assert(this.config, 'Playground config is not defined');
    // TODO: Remove condition
    if (this.config.files.length) {
      this.loadModels(this.config.files);
    }
  }
}


