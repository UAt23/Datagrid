import { Component, OnInit } from '@angular/core';
import { NotificationService } from './shared/services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  notifications: any[] = [];
  title = 'datagrid';
  
  constructor(private notificationService: NotificationService) {}
  
  ngOnInit(): void {
    this.notificationService.notification$.subscribe((notification) => {
      this.notifications.push(notification);

      setTimeout(() => {
        this.dismissNotification(notification);
      }, 3000);
    });
  }

  dismissNotification(notification: any): void {
    this.notifications = this.notifications.filter((n) => n !== notification);
  }
}
