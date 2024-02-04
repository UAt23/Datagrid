import { Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { faLinkedin, faSquareBehance, faSquareInstagram, faSquareYoutube, } from '@fortawesome/free-brands-svg-icons';
import { faBars, faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import { SideMenuService } from '../../shared/services/side-menu.service';

@Component({
  selector: 'navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {

  Breakpoints = Breakpoints;
  isMenuOpen!: boolean;

  faYoutube = faSquareYoutube
  faInstagram = faSquareInstagram;
  faBehance = faSquareBehance;
  faLinkedIn = faLinkedin;
  faBars = faBars;
  faBarsStaggered = faBarsStaggered;

  constructor(
    private sidebarService: SideMenuService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.sidebarService.getSidebarOpenStatus().subscribe((isOpen) => {
      this.isMenuOpen = isOpen;
      this.cdr.detectChanges();
      console.log(this.isMenuOpen);
    });
  }

  toggleMenu() {
    console.log(this.isMenuOpen);
    
    this.sidebarService.toggleSidebar();
  }
  
}
