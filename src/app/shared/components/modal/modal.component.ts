import { Component, Input, TemplateRef } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() contentTemplate!: TemplateRef<any>;
  @Input() displayCloseIcon: boolean = true;
  @Input() displayHeader: boolean = false;
  @Input() title: string = 'Default Title';
  @Input() closeButton: string = 'Close';
  @Input() okayButton: string = 'Okay';
  @Input() width: string = 'auto';
  @Input() height: string = 'auto';

  constructor(private modalService: ModalService) {}

  closeModal() {
    this.modalService.closeModal();
  }
}