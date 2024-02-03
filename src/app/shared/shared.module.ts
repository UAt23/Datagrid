import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { ModalComponent } from './components/modal/modal.component';

const COMPONENTS = [ModalComponent]

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule,
  ],
  exports: [
    OverlayModule,
    PortalModule,
    ...COMPONENTS,

  ]
})
export class SharedModule { }
