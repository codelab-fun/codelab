import { AutorunComponent } from './autorun/autorun.component';
import { BrowserWindowModule } from '../browser-window/browser-window.module';
import { CodeEditorComponent } from './code-editor/code-editor.component';
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
import { ResizeModule } from '../resize/resize.module';
import { RunnerComponent } from './runner/runner.component';
import { ScriptLoaderService } from './services/script-loader.service';
import { SlidesPreviewComponent } from './slides-preview/slides-preview.component';
import { TestsComponent } from './tests/tests.component';
import { TooltipsModule } from '../tooltips/tooltips.module';


@NgModule({
  declarations: [
    ExerciseComponent,
    EditorsComponent,
    AutorunComponent,
    TestsComponent,
    RunnerComponent,
    EditorComponent,
    SlidesPreviewComponent,
    PlaygroundComponent,
    CodeEditorComponent,
    FileTreeComponent
  ], imports: [
    ResizeModule,
    CommonModule,
    FormsModule,
    TooltipsModule,
    BrowserWindowModule
  ], providers: [LoopProtectionService, ScriptLoaderService, MonacoConfigService],
  exports: [ExerciseComponent, PlaygroundComponent, EditorComponent, SlidesPreviewComponent, RunnerComponent,
    CodeEditorComponent]
})
export class ExerciseModule {
}
