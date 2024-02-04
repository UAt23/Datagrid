import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject = new Subject<any>();
  notification$ = this.notificationSubject.asObservable();

  showNotification(message: string, context: 'success' | 'error' | 'warn'): void {
    this.notificationSubject.next({ message, context });
  }
}