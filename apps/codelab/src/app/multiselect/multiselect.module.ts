import { NgModule } from '@angular/core';

import { MultiselectItemDirective } from './multiselect-item.directive';
import { MultiselectListDirective } from './multiselect-list.directive';

@NgModule({
  declarations: [MultiselectListDirective, MultiselectItemDirective],
  exports: [MultiselectListDirective, MultiselectItemDirective]
})
export class MultiselectModule {}
