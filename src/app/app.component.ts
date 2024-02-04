import { Component, OnInit } from '@angular/core';
import { NotificationService } from './shared/services/notification.service';
import { SideMenuService } from './shared/services/side-menu.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('slideInOut', [
      state('true', style({
        transform: 'translateX(0)',
      })),
      state('false', style({
        transform: 'translateX(100%)',
      })),
      transition('false => true, true => false', animate('300ms ease-in-out')),
    ]),
  ],
})
export class AppComponent implements OnInit {
  notifications: any[] = [];
  title = 'datagrid';
  isSidebarOpen!: boolean;

  constructor(
    private notificationService: NotificationService,
    private sidebarService: SideMenuService
  ) { }

  ngOnInit(): void {
    this.notificationService.notification$.subscribe((notification) => {
      this.notifications.push(notification);

      setTimeout(() => {
        this.dismissNotification(notification);
      }, 3000);
    });

    this.sidebarService.getSidebarOpenStatus().subscribe((isOpen) => {
      this.isSidebarOpen = isOpen;
    });
  }

  dismissNotification(notification: any): void {
    this.notifications = this.notifications.filter((n) => n !== notification);
  }
}
