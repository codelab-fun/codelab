import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../../../../../libs/presentation/src/lib/slide-routes';
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
import { SimpleEditorModule } from '../../../exercise/simple-editor/simple-editor.module';
import { TooltipsModule } from '../../../../../../../libs/tooltips/src';
import { CompareComponent } from './compare/compare.component';
import { MatAutocompleteModule, MatSelectModule } from '@angular/material';
import { HtmlPostComponent } from './html-post/html-post.component';
import { SharedPipeModule } from '../../../../../../../libs/utils/src/lib/pipes/pipes.module';
import { ConsoleModule } from '../../../../../../../libs/console/src';
import { PresentationModule } from '../../../../../../../libs/presentation/src';
import { ExerciseModule } from '../../../exercise/exercise.module';
import { NewProgressBarModule } from '../ast/new-progress-bar/new-progress-bar.module';
import { BinaryGifComponent } from './binary-gif/binary-gif.component';
import { BinaryFlatComponent } from './binary-flat/binary-flat.component';


const routes = RouterModule.forChild(
  SlidesRoutes.get(BinaryComponent)
);

@NgModule({
  imports: [
    routes,
    FormsModule,
    CommonModule,
    BinaryViewModule,
    SimpleEditorModule,
    TooltipsModule,
    MatAutocompleteModule,
    SharedPipeModule,
    ConsoleModule,
    PresentationModule,
    ExerciseModule,
    NewProgressBarModule,
    MatSelectModule,
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
    BinaryFlatComponent,
  ],
  entryComponents: [
    FakeGifComponent,
    MidiComponent,
    AsciiComponent,
    BindecComponent,
    MessageComponent,
    JsonComponent,
    HtmlPostComponent,
    CompareComponent,
  ],
  exports: [BinaryComponent]
})
export class BinaryModule {

}
