import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { StreamSession } from '../overlay-config.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'slides-session-config',
  templateUrl: './session-config.component.html',
  styleUrls: ['./session-config.component.css']
})
export class SessionConfigComponent implements OnInit, OnChanges {
  @Input() session: StreamSession;

  controls = {
    name: new FormControl()
  };
  form = new FormGroup(this.controls);

  ngOnChanges(changes: SimpleChanges) {
    if (changes.session) {
      this.form.setValue(this.session);
    }
  }

  ngOnInit() {}
}
