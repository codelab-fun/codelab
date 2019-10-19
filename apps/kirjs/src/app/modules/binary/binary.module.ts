import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '@codelab/slides/src/lib/routing/slide-routes';
import { BinaryComponent } from './binary.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FakeGifComponent } from './fake-gif/fake-gif.component';
import { GifPaletteComponent } from './gif-palette/gif-palette.component';
import { BinaryViewModule } from './binary-view/binary-view.module';
import { MidiComponent } from './midi/midi.component';
import { AsciiComponent } from './ascii/ascii.component';
import { BindecComponent } from './bindec/bindec.component';
import { MessageComponent } from './message/message.component';
import { JsonComponent } from './json/json.component';

import { CompareComponent } from './compare/compare.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { HtmlPostComponent } from './html-post/html-post.component';
import { SharedPipeModule } from '@codelab/utils/src/lib/pipes/pipes.module';
import { ConsoleModule } from '@codelab/console';

import { NewProgressBarModule } from '../ast/new-progress-bar/new-progress-bar.module';
import { BinaryGifComponent } from './binary-gif/binary-gif.component';
import { BitComponent } from './bit/bit.component';
import { MemoryComponent } from './memory/memory.component';

import { FeedbackModule } from '@codelab/feedback';
import { BinaryParserDemoComponent } from './binary-parser-demo/binary-parser-demo.component';
import { HexdecComponent } from './hexdec/hexdec.component';
import { SlidesModule } from '@codelab/slides';
import { AngularFlagsComponent } from './angular-flags/angular-flags.component';
import { ColorIndexingComponent } from './color-indexing/color-indexing.component';
import { BitwiseComponent } from './bitwise/bitwise.component';
import { ToReadComponent } from './to-read/to-read.component';
import { CodeDemoModule } from '@codelab/code-demos';

const routes = RouterModule.forChild(SlidesRoutes.get(BinaryComponent));

@NgModule({
  imports: [
    routes,
    FormsModule,
    CommonModule,
    BinaryViewModule,
    CodeDemoModule,
    MatAutocompleteModule,
    SharedPipeModule,
    ConsoleModule,

    NewProgressBarModule,
    MatSelectModule,
    SlidesModule,
    FeedbackModule
  ],
  declarations: [
    BinaryComponent,
    FakeGifComponent,
    GifPaletteComponent,
    MidiComponent,
    AsciiComponent,
    BindecComponent,
    MessageComponent,
    JsonComponent,
    CompareComponent,
    HtmlPostComponent,
    BinaryGifComponent,
    BitComponent,
    MemoryComponent,
    BinaryParserDemoComponent,
    HexdecComponent,
    AngularFlagsComponent,
    ColorIndexingComponent,
    BitwiseComponent,
    ToReadComponent
  ],
  entryComponents: [
    FakeGifComponent,
    MidiComponent,
    AsciiComponent,
    BindecComponent,
    MessageComponent,
    JsonComponent,
    HtmlPostComponent,
    CompareComponent
  ],
  exports: [BinaryComponent]
})
export class BinaryModule {}
