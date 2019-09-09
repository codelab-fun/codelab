import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesModule } from '@codelab/slides';
import { SlidesRoutes } from '@codelab/slides/src/lib/routing/slide-routes';
import { RouterModule } from '@angular/router';
import { WebassemblyComponent } from './webassembly.component';
import { WebassemblyPlaygroundComponent } from './webassembly-playground/webassembly-playground.component';
import { CodeDemoModule } from '@codelab/code-demos';
import { FormsModule } from '@angular/forms';
import { WebassemblyRunnerComponent } from './webassembly-playground/webassembly-runner/webassembly-runner.component';
import { WasmBinaryComponent } from './wasm-binary/wasm-binary.component';
import { BinaryViewModule } from '../binary/binary-view/binary-view.module';
import { BinaryInlineModule } from '../binary/binary-inline/binary-inline.module';
import { SyncDirectivesModule } from '@codelab/utils/src/lib/sync/directives/sync-directives.module';
import { WebassemblyCodeModeComponent } from './webassembly-playground/webassembly-code-mode/webassembly-code-mode.component';
import { MatButtonModule } from '@angular/material';
import { GetItemRunnerComponent } from './webassembly-playground/get-item-runner/get-item-runner.component';
import { ErrorMessageComponent } from './webassembly-playground/error-message/error-message.component';


const routes = RouterModule.forChild(SlidesRoutes.get(WebassemblyComponent));

@NgModule({
  declarations: [
    WebassemblyComponent,
    WebassemblyPlaygroundComponent,
    WebassemblyRunnerComponent,
    WasmBinaryComponent,
    WebassemblyCodeModeComponent,
    GetItemRunnerComponent,
    ErrorMessageComponent,

  ],
  imports: [



    MatButtonModule,
    CommonModule,
    SlidesModule,
    CodeDemoModule,
    FormsModule,
    routes,
    BinaryViewModule,
    BinaryInlineModule,
    SyncDirectivesModule
  ]
})
export class WebassemblyModule {
}
