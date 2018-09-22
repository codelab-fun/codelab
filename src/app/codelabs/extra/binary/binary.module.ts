import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../presentation/slide-routes';
import { BinaryComponent } from './binary.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FakeGifComponent } from './fake-gif/fake-gif.component';
import { DisplayDynamicComponent } from './display-dynamic.component/display-dynamic-component.component';
import { GifPaletteComponent } from './gif-palette/gif-palette.component';
import { BinaryViewModule } from './binary-view/binary-view.module';
import { MidiComponent } from './midi/midi.component';
import { AsciiComponent } from './ascii/ascii.component';
import { BindecComponent } from './bindec/bindec.component';
import { MessageComponent } from './message/message.component';

const routes = RouterModule.forChild(
  SlidesRoutes.get(BinaryComponent)
);

@NgModule({
  imports: [
    routes,
    FormsModule,
    CommonModule,
    BinaryViewModule
  ],
  declarations: [
    BinaryComponent,
    FakeGifComponent,
    DisplayDynamicComponent,
    GifPaletteComponent,
    MidiComponent,
    AsciiComponent,
    BindecComponent,
    MessageComponent,
  ],
  entryComponents: [
    FakeGifComponent,
    MidiComponent,
    AsciiComponent,
    BindecComponent,
    MessageComponent,
  ],
  exports: [BinaryComponent]
})
export class BinaryModule {

}
