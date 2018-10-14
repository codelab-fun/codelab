import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockComponent } from './block/block.component';
import { ObjectComponent } from './object/object.component';
import { BitsComponent } from './bits/bits.component';
import { StringComponent } from './string/string.component';
import { NumberComponent } from './number/number.component';
import { ArrayComponent } from './array/array.component';
import { ColorComponent } from './color/color.component';
import { BinaryParentComponent } from './binary-parent/binary-parent.component';
import { HexComponent } from './hex/hex.component';
import { InlineComponent } from './inline/inline.component';
import { InlineRootComponent } from './inline-root/inline-root.component';
import { AutoSizeInputModule } from 'ngx-autosize-input';

@NgModule({
  imports: [
    CommonModule,
    AutoSizeInputModule
  ],
  declarations: [
    BlockComponent, ObjectComponent, BitsComponent, StringComponent, NumberComponent, ArrayComponent, ColorComponent,
    BinaryParentComponent,
    HexComponent, InlineComponent, InlineRootComponent
  ],
  exports: [
    BlockComponent, ObjectComponent, BitsComponent, StringComponent, NumberComponent, ArrayComponent, ColorComponent,
    BinaryParentComponent, HexComponent
  ],
  entryComponents: [
    BlockComponent, ObjectComponent, BitsComponent, StringComponent, NumberComponent, ArrayComponent, ColorComponent,
    HexComponent
  ]
})
export class BinaryViewModule {
}
