import {
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import { SlideViewType } from '../../../types';
import { CodelabExerciseComponent } from '../../../../../components/exercise/exercise.component';
import { CodelabTitleSlideEditorComponent } from '../../../wrappers/custom-component-editors/codelab-title-slide-editor/codelab-title-slide-editor.component';
import { CodelabCodeDemoFilePathEditorComponent } from '../../../wrappers/custom-component-editors/codelab-code-demo-file-path-editor/codelab-code-demo-file-path-editor.component';
import { CodelabCodeDemoConsoleComponent } from '../../../wrappers/custom-component-editors/codelab-code-demo-console/codelab-code-demo-console.component';
import { CodeDemoEditorEditorComponent } from '../../../wrappers/custom-component-editors/codelab-code-demo-editor-editor/code-demo-editor.component';
import { CodelabImageEditorComponent } from '../../../wrappers/custom-component-editors/codelab-image-editor/codelab-image-editor.component';
import { BlankComponent } from '../blank/blank.component';
import { CodelabCodeDemoPreviewComponent } from '../../../wrappers/custom-component-previews/codelab-code-demo-preview/codelab-code-demo-preview.component';
import { TitleSlideComponent } from '../../../../../components/slides/title-slide/title-slide.component';

@Component({
  selector: 'slides-dynamic-renderer',
  template: '',
  styleUrls: ['./dynamic-renderer.component.css']
})
export class DynamicRendererComponent implements OnInit {
  @Input() block;
  @Input() mode: SlideViewType = 'preview';

  constructor(
    private readonly vcr: ViewContainerRef,
    private readonly componentFactoryResolver: ComponentFactoryResolver
  ) {}

  async ngOnInit() {
    const componentMap = {
      preview: {
        'codelab-title-slide': TitleSlideComponent,
        'codelab-code-demo-console': CodelabCodeDemoPreviewComponent,
        'codelab-exercise-preview': CodelabCodeDemoPreviewComponent,
        'codelab-exercise': CodelabCodeDemoPreviewComponent,
        'codelab-closing-slide': CodelabTitleSlideEditorComponent,
        'codelab-code-demo-file-path': CodelabCodeDemoPreviewComponent,
        'codelab-code-demo-editor': CodelabCodeDemoPreviewComponent,
        'codelab-image': CodelabImageEditorComponent
      },
      view: {
        'codelab-title-slide': BlankComponent
      },
      edit: {
        'codelab-title-slide': CodelabTitleSlideEditorComponent,
        'codelab-code-demo-console': CodelabCodeDemoConsoleComponent,
        'codelab-exercise-preview': CodelabExerciseComponent,
        'codelab-exercise': CodelabExerciseComponent,
        'codelab-closing-slide': CodelabTitleSlideEditorComponent,
        'codelab-code-demo-file-path': CodelabCodeDemoFilePathEditorComponent,
        'codelab-code-demo-editor': CodeDemoEditorEditorComponent,
        'codelab-image': CodelabImageEditorComponent
      }
    };

    const componentType = componentMap[this.mode][this.block.tag];
    console.log(this.block);
    console.log(componentType, this.block.props);
    console.assert(componentType, this.block.tag);
    const cf = this.componentFactoryResolver.resolveComponentFactory(
      componentType
    );
    this.vcr.clear();
    const componentRef = this.vcr.createComponent(cf);

    for (const prop in this.block.props) {
      if (this.block.props.hasOwnProperty(prop)) {
        componentRef.instance[prop] = this.block.props[prop];
      }
    }

    componentRef.changeDetectorRef.detectChanges();
  }
}
