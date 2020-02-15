import { NgModule } from '@angular/core';
import { CodelabsRoutingModule } from './codelabs-routing.module';
import { IndexModule } from '../components/index';

@NgModule({
  imports: [CodelabsRoutingModule, IndexModule]
})
export class CodelabsModule {}
