import { Component } from '@angular/core';

@Component({
  selector: 'info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})

export class InfoComponent {
  private isExpanded: boolean;

  expandToggle() {
    return this.isExpanded = !this.isExpanded;
  }
}
