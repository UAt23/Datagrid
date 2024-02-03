import { TemplateRef } from "@angular/core";
import { FormGroup } from "@angular/forms";

export interface ModalConfig {
   form: FormGroup;
   contentTemplate: TemplateRef<any>;
   title?: string;
   closeButton?: string;
   openButton?: string;
   width?: string;
   height?: string;
   closeOnBackdropClick?: boolean;
}