import {NgModule} from '@angular/core';
import {ExerciseComponent} from './exercise/exercise.component';
import {BrowserModule} from '@angular/platform-browser';
import {EditorsComponent} from './editors/editors.component';
import {AutorunComponent} from './autorun/autorun.component';
import {TestsComponent} from './tests/tests.component';
import {RunnerComponent} from './runner/runner.component';
import {EditorComponent} from './editor/editor.component';
import {ResizeComponent} from './resize/resize.component';
import {FormsModule} from '@angular/forms';
import {LoopProtectionService} from './services/loop-protection.service';
import {ScriptLoaderService} from './services/script-loader.service';
import {MonacoConfigService} from './services/monaco-config.service';

@NgModule({
  declarations: [
    ExerciseComponent,
    EditorsComponent, AutorunComponent, TestsComponent, RunnerComponent, EditorComponent, ResizeComponent,],
  imports: [BrowserModule, FormsModule],
  providers: [LoopProtectionService, ScriptLoaderService, MonacoConfigService],
  exports: [ExerciseComponent, EditorComponent]
})
export class ExerciseModule {
}
