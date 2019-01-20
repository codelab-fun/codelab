import { BrowserWindowModule } from '../../../browser/src/lib/browser.module';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor/editor.component';
import { EditorsComponent } from './editors/editors.component';
import { FileTreeComponent } from './file-tree/file-tree.component';
import { FormsModule } from '@angular/forms';
import { LoopProtectionService } from './services/loop-protection.service';
import { MonacoConfigService } from './services/monaco-config.service';
import { NgModule } from '@angular/core';
import { ScriptLoaderService } from './services/script-loader.service';

import { FileStructureComponent } from './file-structure/file-structure.component';
import { DepsService } from './services/deps-order.service';

import { SizePickerModule } from '../../../../apps/kirjs/src/app/modules/ast/size-picker/size-picker.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
        BrowserWindowModule,
    SizePickerModule
  ],
  declarations: [
    EditorsComponent,
    EditorComponent,
    FileTreeComponent,
    FileStructureComponent
  ],
  providers: [
    LoopProtectionService,
    ScriptLoaderService,
    MonacoConfigService,
    DepsService
  ],
  exports: [EditorComponent]
})
export class ExerciseModule {}
