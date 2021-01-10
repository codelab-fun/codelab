import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ng2tsConfig } from '../../../../../../../../ng2ts/ng2ts';

@Component({
  selector: 'codelab-exercise-editor',
  templateUrl: './codelab-exercise-editor.component.html',
  styleUrls: ['./codelab-exercise-editor.component.css']
})
export class CodelabExerciseEditorComponent implements OnInit {
  @Input() data;
  @Output() dataChange = new EventEmitter();

  readonly config = ng2tsConfig;
  milestone?: any;
  exercise?: any;
  type = 'preview';

  ngOnInit(): void {
    const props = JSON.parse(this.data);
    this.milestone = ng2tsConfig.milestones.find(
      m => m.name === props.milestone
    );
    if (this.milestone) {
      this.exercise = this.milestone.exercises.find(
        m => m.name === props.exercise
      );
    }
    this.type = props.type;
  }

  update() {
    this.dataChange.emit({
      milestone: this.milestone ? this.milestone.name : '',
      exercise: this.exercise ? this.exercise.name : '',
      type: this.type || ''
    });
  }
}
