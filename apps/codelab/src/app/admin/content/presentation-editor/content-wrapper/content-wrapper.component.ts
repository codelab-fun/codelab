import { Component } from '@angular/core';
import { AutoSaveService, SaveStatus } from "../services/auto-save.service";

@Component({
  selector: 'slides-content-wrapper',
  templateUrl: './content-wrapper.component.html',
  styleUrls: ['./content-wrapper.component.css'],
})
export class ContentWrapperComponent {
  readonly saveStatus$ = this.autoSaveService.saveStatus$;
  readonly SaveStatus = SaveStatus;

  constructor(private readonly autoSaveService: AutoSaveService
  ) {
    autoSaveService.startAutosave();
  }

  save(){
    this.autoSaveService.save();
  }
}
