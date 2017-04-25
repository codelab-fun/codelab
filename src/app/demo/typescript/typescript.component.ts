import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BaseRouteableComponent} from '../BaseRouteableComponent';
import {ng2tsConfig} from '../../../../ng2ts/ng2ts';

@Component({
  selector: 'app-typescript',
  templateUrl: './typescript.component.html',
  styleUrls: ['./typescript.component.css']
})
export class TypescriptComponent extends BaseRouteableComponent {
  exercises = ng2tsConfig.milestones[0].exercises;
}

