import { Component, OnInit } from '@angular/core';
import { ng2tsConfig } from '../../../../../../../ng2ts/ng2ts';

@Component({
  selector: 'slides-stages',
  templateUrl: './stages.component.html',
  styleUrls: ['./stages.component.css']
})
export class StagesComponent implements OnInit {
  files: string[];
  selectedFile: string;
  stages: string[];
  selectedStage: string;

  displayedContent?: {
    solution: string;
    template: string;
  };

  constructor() {
    this.files = this.extractFiles() as string[];
    this.selectFile(this.files[0]);
  }

  selectFile(file: string) {
    this.selectedFile = file;
    this.stages = this.extractStages(file) as string[];
    this.selectStage(this.stages[0]);
  }

  extractStages(file) {
    return ng2tsConfig.milestones
      .map(m => m.exercises)
      .flat()
      .filter(e => e.files && e.files.some(f => f.path === file))
      .map(e => e.name);
  }

  extractFiles() {
    const allFiles = ng2tsConfig.milestones
      .map(m => m.exercises)
      .flat()
      .filter(e => e.files)
      .map(e => e.files.map(f => f.path))
      .flat();

    return [...new Set(allFiles)];
  }

  extractSingleFile(stage: string, file: string) {
    const result = ng2tsConfig.milestones
      .map(m => m.exercises)
      .flat()
      .find(e => e.name === stage)
      .files.find(f => f.path === file);

    this.displayedContent = {
      solution: result.solution,
      template: result.template
    };
  }

  ngOnInit(): void {}

  selectStage(stage: string) {
    this.selectedStage = stage;
    this.extractSingleFile(stage, this.selectedFile);
  }
}
