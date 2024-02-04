import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { faLinkedin, faSquareBehance, faSquareInstagram, faSquareYoutube,  } from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent { 
  faYoutube = faSquareYoutube
  faInstagram = faSquareInstagram;
  faBehance = faSquareBehance;
  faLinkedIn = faLinkedin;
}
