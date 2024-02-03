import { ComponentRef, Injectable, Injector, TemplateRef } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { ModalComponent } from '../components/modal/modal.component';
import { Subject } from 'rxjs';
import { ModalConfig } from '../models/modal-config.model';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private overlayRef!: OverlayRef;
  private modalClosedSubject = new Subject<void>();

  modalClosed$ = this.modalClosedSubject.asObservable();

  constructor(private overlay: Overlay, private injector: Injector) {}

  openModal(config: ModalConfig) {
    this.closeModal(); // Close any existing modal
  
    const overlayConfig: OverlayConfig = {
      hasBackdrop: true,
      backdropClass: 'modal-backdrop',
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
    };
  
    this.overlayRef = this.overlay.create(overlayConfig);
    const portal = new ComponentPortal(ModalComponent, null, this.createInjector(config.contentTemplate));
  
    const componentRef = this.overlayRef.attach(portal);
    componentRef.instance.contentTemplate = config.contentTemplate;
    componentRef.instance.title = config.title || 'Default Title';
    componentRef.instance.closeButton = config.closeButton || 'Close';
    componentRef.instance.okayButton = config.openButton || 'Open';
    componentRef.instance.width = config.width || 'auto';
    componentRef.instance.height = config.height || 'auto';
  
    this.overlayRef.backdropClick().subscribe(() => this.closeModal());
  }

  closeModal() {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.modalClosedSubject.next();
    }
  }

  private createInjector(contentTemplate: TemplateRef<any>): Injector {
    return Injector.create({
      parent: this.injector,
      providers: [
        {
          provide: TemplateRef,
          useValue: contentTemplate,
        },
      ],
    });
  }
}