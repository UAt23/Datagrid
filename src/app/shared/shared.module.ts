import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { ModalComponent } from './components/modal/modal.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationService } from './services/notification.service';

const COMPONENTS = [ModalComponent, NotificationComponent]

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule,
    BrowserAnimationsModule,
  ],
  exports: [
    OverlayModule,
    PortalModule,
    ...COMPONENTS,
  ],
  providers: [
    NotificationService
  ]
})
export class SharedModule { }
