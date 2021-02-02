import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output
} from '@angular/core';
import { ng2tsConfig } from '../../../../../../../../../../ng2ts/ng2ts';
import { ContentSlide, CustomBlock } from '../../../types';
import { ContentService } from '../../../content.service';

@Component({
  selector: 'codelab-exercise-editor',
  templateUrl: './codelab-exercise-editor.component.html',
  styleUrls: ['./codelab-exercise-editor.component.css']
})
export class CodelabExerciseEditorComponent implements OnChanges {
  @Input() data;
  @Output() dataChange = new EventEmitter();
  @Input() block!: CustomBlock;
  @Input() slide!: ContentSlide;

  readonly config = ng2tsConfig;
  @Input() milestone: string;
  @Input() exercise: string;
  @Input() type = 'preview';
  selectedMilestone: any;
  selectedExercise: any;

  ngOnChanges() {
    this.selectedMilestone = ng2tsConfig.milestones.find(
      m => m.name === this.milestone
    );

    if (this.milestone) {
      this.selectedExercise = this.selectedMilestone.exercises.find(
        m => m.name === this.exercise
      );
    }
  }

  constructor(private readonly contentService: ContentService) {}

  update() {
    console.log(this.selectedMilestone);

    this.contentService.updateBlock(this.slide.id, {
      ...this.block,
      props: {
        milestone: this.selectedMilestone?.name || '',
        exercise: this.selectedExercise?.name || '',
        type: this.type
      }
    });
  }
}
