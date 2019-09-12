import { NgModule } from '@angular/core';
import { CodelabsRoutingModule } from './codelabs-routing.module';
import { IndexModule } from '../components/index/index.module';

@NgModule({
  imports: [CodelabsRoutingModule, IndexModule]
})
export class CodelabsModule {}
