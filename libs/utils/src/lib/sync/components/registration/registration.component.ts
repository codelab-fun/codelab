import { Component, Input, OnInit } from '@angular/core';
import { SyncService } from '@codelab/utils/src/lib/sync/sync.service';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'slides-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  @Input() key = name;
  name = '';
  saved = false;
  readonly value = new Subject();
  readonly allValues = new Subject();


  constructor(private readonly syncService: SyncService<any>) {

  }

  save() {
    this.syncService.updateViewerValue(this.key, this.name);
  }

  clear() {
    this.syncService.updateViewerValue(this.key, null);
  }


  ngOnInit() {
    this.syncService.getViewerValue(this.key).subscribe(this.value);
    this.syncService.getAllViewersValues(this.key)
      .pipe(map(a => {
        return Object.values(a);
      })).subscribe(this.allValues);
  }

}
