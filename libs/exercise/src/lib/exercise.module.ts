import { BrowserWindowModule } from '../../../browser/src/lib/browser.module';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor/editor.component';
import { EditorsComponent } from './editors/editors.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { FileTreeComponent } from './file-tree/file-tree.component';
import { FormsModule } from '@angular/forms';
import { LoopProtectionService } from './services/loop-protection.service';
import { MonacoConfigService } from './services/monaco-config.service';
import { NgModule } from '@angular/core';
import { PlaygroundComponent } from './playground/playground.component';
import { RunnerComponent } from './runner/runner.component';
import { ScriptLoaderService } from './services/script-loader.service';
import { SlidesPreviewComponent } from './slides-preview/slides-preview.component';
import { TooltipsModule } from '../../../tooltips/src/lib/tooltips.module';
import { FileStructureComponent } from './file-structure/file-structure.component';
import { DepsService } from './services/deps-order.service';
import { NewEditorsComponent } from './new-editors/new-editors.component';

import { RunnersModule } from './runners/runners.module';
import { SizePickerModule } from '../../../../apps/kirjs/src/app/modules/ast/size-picker/size-picker.module';
import { RealtimeEvalComponent } from './realtime-eval/realtime-eval.component';
import { SimpleEditorModule } from '../../../code-demos/src/lib/editor/simple-editor.module';

@NgModule({
  imports: [
    RunnersModule,
    CommonModule,
    FormsModule,
    TooltipsModule,
    BrowserWindowModule,
    SizePickerModule,
    SimpleEditorModule,
  ],
  declarations: [
    ExerciseComponent,
    EditorsComponent,
    RunnerComponent,
    EditorComponent,
    SlidesPreviewComponent,
    PlaygroundComponent,
    FileTreeComponent,
    FileStructureComponent,
    NewEditorsComponent,
    RealtimeEvalComponent,
  ],
  providers:
    [LoopProtectionService, ScriptLoaderService, MonacoConfigService, DepsService],
  exports:
    [
      ExerciseComponent,
      PlaygroundComponent,
      EditorComponent,
      SlidesPreviewComponent,
      RunnerComponent,
      ExerciseComponent,
      NewEditorsComponent,
      RealtimeEvalComponent,
    ]
})

export class ExerciseModule {
}
