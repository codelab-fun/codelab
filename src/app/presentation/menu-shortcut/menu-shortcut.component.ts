import {Component, Inject, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu-shortcut',
  templateUrl: './menu-shortcut.component.html',
  styleUrls: ['./menu-shortcut.component.css']
})
export class MenuShortcutComponent implements OnInit {
  routes: { name: string, description: string };
  onOpenMenu = false;

  constructor(@Inject('ROUTES') routes) {
    this.routes = routes.filter(route => route.name);
  }

  ngOnInit() {
  }

  onDisplay() {
    this.onOpenMenu = !this.onOpenMenu;
    document.addEventListener('click', (event) => {
      if(!(event.target as HTMLElement).classList.contains('menu-btn')){
        this.onOpenMenu = false;
      }
    });
  }

}
