import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  closeMenu() {
    const menu = document.getElementById('navbarNav');
    if (menu && menu.classList.contains('show')) {
      menu.classList.remove('show');
    }
  }
}
