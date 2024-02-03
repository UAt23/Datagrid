import { Component, Input, TemplateRef } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() form!: FormGroup;
  @Input() contentTemplate!: TemplateRef<any>;
  @Input() displayCloseIcon: boolean = true;
  @Input() displayHeader: boolean = false;
  @Input() title: string = 'Default Title';
  @Input() closeButton: string = 'Close';
  @Input() okayButton: string = 'Okay';
  @Input() width: string = 'auto';
  @Input() height: string = 'auto';

  errorVisible = false;
  emptyFormFields = {
    link: '',
    name: '',
    description: ''
  }

  constructor(private modalService: ModalService) {}

  closeModal() {
    this.form.setValue(this.emptyFormFields)
    this.modalService.closeModal();
  }

  onOkayClicked() {
    if (this.form.valid) {
      this.errorVisible = false;
    } else {
      this.errorVisible = true;
    }
    this.modalService.triggerSubmit();
  }
}