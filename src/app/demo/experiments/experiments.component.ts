import {Component} from '@angular/core';


@Component({
  selector: 'app-experiments',
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.css']
})
export class ExperimentsComponent {
  title = 'Experiments';
  description = '';
  prereqs = 'Components, Dependency Injection';

}
