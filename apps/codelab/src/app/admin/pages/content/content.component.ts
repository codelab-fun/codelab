import { Component } from '@angular/core';
import { AutoSaveService, SaveStatus } from './services/auto-save.service';

@Component({
  selector: 'slides-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent {

  readonly saveStatus$ = this.autoSaveService.saveStatus$;
  readonly SaveStatus = SaveStatus;

  constructor(
    private readonly autoSaveService: AutoSaveService
  ) {
    this.autoSaveService.startAutosave();
  }

  save(){
    this.autoSaveService.save();
  }
}
