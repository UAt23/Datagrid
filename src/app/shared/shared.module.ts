import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { ModalComponent } from './components/modal/modal.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationService } from './services/notification.service';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SideMenuService } from './services/side-menu.service';

const COMPONENTS = [ModalComponent, NotificationComponent, SideMenuComponent]

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    OverlayModule,
    PortalModule,
    BrowserAnimationsModule,
  ],
  exports: [
    FontAwesomeModule,
    OverlayModule,
    PortalModule,
    ...COMPONENTS,
  ],
  providers: [
    NotificationService,
    SideMenuService
  ]
})
export class SharedModule { }
