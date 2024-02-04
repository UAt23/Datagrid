import { ComponentRef, Injectable, Injector, TemplateRef } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { ModalComponent } from '../components/modal/modal.component';
import { Subject } from 'rxjs';
import { ModalConfig } from '../models/modal-config.model';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private overlayRef!: OverlayRef;
  private modalClosedSubject = new Subject<void>();

  modalClosed$ = this.modalClosedSubject.asObservable();

  private submitSubject = new Subject<void>();

  submit$ = this.submitSubject.asObservable();

  emptyFormFields = {
    link: '',
    name: '',
    description: ''
  }

  constructor(private overlay: Overlay, private injector: Injector) { }

  openModal(config: ModalConfig) {

    const overlayConfig: OverlayConfig = {
      hasBackdrop: config.closeOnBackdropClick !== false, // Close on backdrop click unless explicitly set to false
      backdropClass: 'modal-backdrop',
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
    };

    this.overlayRef = this.overlay.create(overlayConfig);
    const portal = new ComponentPortal(ModalComponent, null, this.createInjector(config.contentTemplate));

    const componentRef = this.overlayRef.attach(portal);
    componentRef.instance.form = config.form;
    componentRef.instance.contentTemplate = config.contentTemplate;
    componentRef.instance.title = config.title || 'Default Title';
    componentRef.instance.closeButton = config.closeButton || 'Close';
    componentRef.instance.okayButton = config.openButton || 'Open';
    componentRef.instance.width = config.width || 'auto';
    componentRef.instance.height = config.height || 'auto';

    this.overlayRef.backdropClick().subscribe(() => {
      if (config.closeOnBackdropClick !== false) {
        this.closeModal(config.form);
      }
    });
  }

  closeModal(form: FormGroup) {
    if (this.overlayRef) {
      form.setValue(this.emptyFormFields);
      this.overlayRef.dispose();
      this.modalClosedSubject.next();
      this.submitSubject.complete();
      this.restoreSubmitSubject();
    }
  }

  restoreSubmitSubject() {
    this.submitSubject = new Subject<void>();
    this.submit$ = this.submitSubject.asObservable();
  }

  triggerSubmit() {
    this.submitSubject.next();
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