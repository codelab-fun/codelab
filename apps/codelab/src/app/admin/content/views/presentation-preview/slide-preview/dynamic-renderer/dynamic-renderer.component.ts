import {
  Component,
  Injectable,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { NgxdResolver } from '@ngxd/core';
import { ContentSlide, CustomBlock, SlideViewType } from '../../../presentation-editor/types';
import { CodelabTitleSlideEditorComponent } from '../../../presentation-editor/wrappers/custom-component-editors/codelab-title-slide-editor/codelab-title-slide-editor.component';
import { CodelabCodeDemoFilePathEditorComponent } from '../../../presentation-editor/wrappers/custom-component-editors/codelab-code-demo-file-path-editor/codelab-code-demo-file-path-editor.component';
import { CodelabCodeDemoConsoleEditorComponent } from '../../../presentation-editor/wrappers/custom-component-editors/codelab-code-demo-console-editor/codelab-code-demo-console-editor.component';
import { CodeDemoEditorEditorComponent } from '../../../presentation-editor/wrappers/custom-component-editors/codelab-code-demo-editor-editor/code-demo-editor.component';
import { CodelabImageEditorComponent } from '../../../presentation-editor/wrappers/custom-component-editors/codelab-image-editor/codelab-image-editor.component';
import { CodelabCodeDemoPreviewComponent } from '../../../presentation-editor/wrappers/custom-component-previews/codelab-code-demo-preview/codelab-code-demo-preview.component';
import { CodelabExerciseEditorComponent } from '../../../presentation-editor/wrappers/custom-component-editors/codelab-exercise-preview-editor/codelab-exercise-editor.component';
import { TitleSlideComponent } from '../../../../../../components/slides/title-slide/title-slide.component';
import { CodelabCodeDemoConsoleViewerComponent } from '../../../presentation-editor/wrappers/custom-components-viewers/codelab-code-demo-console-viewer/codelab-code-demo-console-viewer.component';

@Injectable({ providedIn: 'root' })
export class PreviewDynamicComponentResolver extends NgxdResolver<string, any> {
  constructor() {
    super([
      { type: 'codelab-title-slide', component: TitleSlideComponent },
      {
        type: 'codelab-code-demo-console-editor',
        component: CodelabCodeDemoPreviewComponent,
      },
      {
        type: 'codelab-exercise-preview',
        component: CodelabCodeDemoPreviewComponent,
      },
      { type: 'codelab-exercise', component: CodelabCodeDemoPreviewComponent },
      {
        type: 'codelab-closing-slide',
        component: CodelabTitleSlideEditorComponent,
      },
      {
        type: 'codelab-code-demo-file-path',
        component: CodelabCodeDemoPreviewComponent,
      },
      {
        type: 'codelab-code-demo-editor',
        component: CodelabCodeDemoPreviewComponent,
      },
      { type: 'codelab-image', component: CodelabImageEditorComponent },
    ]);
  }
}

@Injectable({ providedIn: 'root' })
export class ViewDynamicComponentResolver extends NgxdResolver<string, any> {
  constructor() {
    super([
      { type: 'codelab-title-slide', component: TitleSlideComponent },
      {
        type: 'codelab-code-demo-console-editor',
        component: CodelabCodeDemoConsoleViewerComponent,
      },
    ]);
  }
}

@Injectable({ providedIn: 'root' })
export class EditDynamicComponentResolver extends NgxdResolver<string, any> {
  constructor() {
    super([
      {
        type: 'codelab-title-slide',
        component: CodelabTitleSlideEditorComponent,
      },
      {
        type: 'codelab-code-demo-console-editor',
        component: CodelabCodeDemoConsoleEditorComponent,
      },
      {
        type: 'codelab-exercise-preview',
        component: CodelabExerciseEditorComponent,
      },
      { type: 'codelab-exercise', component: CodelabExerciseEditorComponent },
      {
        type: 'codelab-closing-slide',
        component: CodelabTitleSlideEditorComponent,
      },
      {
        type: 'codelab-code-demo-file-path',
        component: CodelabCodeDemoFilePathEditorComponent,
      },
      {
        type: 'codelab-code-demo-editor',
        component: CodeDemoEditorEditorComponent,
      },
      { type: 'codelab-image', component: CodelabImageEditorComponent },
    ]);
  }
}

@Component({
  selector: 'slides-dynamic-renderer',
  template: `<ng-container *ngxComponentOutlet="resolver | resolve: block.tag; context: block.props"></ng-container>`,
  styleUrls: ['./dynamic-renderer.component.css'],
})
export class DynamicRendererComponent implements OnChanges {
  @Input() block: CustomBlock;
  @Input() mode: SlideViewType = 'preview';
  @Input() slide: ContentSlide;
  @Input() presentationId!: string;

  resolver: NgxdResolver<string, any>;

  constructor(
    private readonly previewResolver: PreviewDynamicComponentResolver,
    private readonly viewResolver: ViewDynamicComponentResolver,
    private readonly editResolver: EditDynamicComponentResolver
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('mode' in changes) {
      switch (this.mode) {
        case 'preview':
          this.resolver = this.previewResolver;
          break;
        case 'view':
          this.resolver = this.viewResolver;
          break;
        case 'edit':
          this.resolver = this.editResolver;
          break;
      }
    }
  }
}
