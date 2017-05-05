import {TooltipsModule} from '../tooltips/tooltips.module';
import {NgModule} from '@angular/core';
import {ExerciseComponent} from './exercise/exercise.component';
import {EditorsComponent} from './editors/editors.component';
import {AutorunComponent} from './autorun/autorun.component';
import {TestsComponent} from './tests/tests.component';
import {RunnerComponent} from './runner/runner.component';
import {EditorComponent} from './editor/editor.component';
import {FormsModule} from '@angular/forms';
import {LoopProtectionService} from './services/loop-protection.service';
import {ScriptLoaderService} from './services/script-loader.service';
import {MonacoConfigService} from './services/monaco-config.service';
import {PlaygroundComponent} from './playground/playground.component';
import {CodeEditorComponent} from './code-editor/code-editor.component';
import {CommonModule} from '@angular/common';
import {BrowserWindowModule} from '../browser-window/browser-window.module';
import {ResizeModule} from '../resize/resize.module';
import {SlidesPreviewComponent} from './slides-preview/slides-preview.component';
import { FileTreeComponent } from './file-tree/file-tree.component';


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
