import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'kirjs-main',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kirjs';

  @HostListener(`window:keydown.meta.'`)
  HandleLinker() {
    const key = 'linker';
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key);
      alert(`Linker removed!`);
    } else {
      const path = window.location.pathname;
      localStorage.setItem(key, path);
      alert(`Linker stored ${path}!`);
    }
  }

  constructor(private router: Router) {
    const path: string = localStorage.getItem('linker');
    if (path && path !== window.location.pathname) {
      router.navigate([path]);
    }
  }
}
