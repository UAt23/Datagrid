import { Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { faLinkedin, faSquareBehance, faSquareInstagram, faSquareYoutube } from '@fortawesome/free-brands-svg-icons';
import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import { SideMenuService } from '../../services/side-menu.service';
@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css',
})
export class SideMenuComponent{
  Breakpoints = Breakpoints;
  faYoutube = faSquareYoutube;
  faInstagram = faSquareInstagram;
  faBehance = faSquareBehance;
  faLinkedIn = faLinkedin;
  faBarsStaggered = faBarsStaggered;

  constructor(private sidebarService: SideMenuService) {}

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

}
