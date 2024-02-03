import { TemplateRef } from "@angular/core";

export interface ModalConfig {
   contentTemplate: TemplateRef<any>;
   title?: string;
   closeButton?: string;
   openButton?: string;
   width?: string;
   height?: string;
}