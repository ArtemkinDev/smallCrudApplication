import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalCustomComponent } from './modal/modal-custom/modal-custom.component';
@NgModule({
  imports: [
    CommonModule,
    NgbModule
  ],
  declarations: [
    ModalCustomComponent
  ],
  providers: []
})
export class SharedModule { }
