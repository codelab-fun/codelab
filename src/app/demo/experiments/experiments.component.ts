import {Component} from '@angular/core';


@Component({
  selector: 'app-experiments',
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.css']
})
export class ExperimentsComponent {
  title = 'Experiments';
  description = 'Human give me attention meow ask to go outside and ask to come inside and ask to go outside and ask to come inside so playing with balls of wool.';
  prereqs = 'Components, Dependency Injection';

}
