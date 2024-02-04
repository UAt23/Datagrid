import { TemplateRef } from "@angular/core"
import { FormGroup } from "@angular/forms"

export interface ModelOpenEvent {
   contentTemplate: TemplateRef<any>,
   modalForm: FormGroup
}