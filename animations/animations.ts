import { animate, keyframes, style, transition, trigger } from '@angular/animations';

export const Animations = {
  changeRoute: trigger('changeRoute', [
    transition('* => animationStarted', [
      animate('1s', keyframes([
        style({transform: 'scale(1.0)'}),
        style({transform: 'scale(1.3)'}),
        style({transform: 'scale(1.0)'})
      ]))
    ]),
  ])
};
