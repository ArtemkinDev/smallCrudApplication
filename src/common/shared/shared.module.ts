import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from '../services/modal.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuccessModalComponent } from './modal/success-modal/success-modal.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    SuccessModalComponent
  ],
  exports: [
    ReactiveFormsModule
  ],
  entryComponents: [
    SuccessModalComponent,
  ],
  providers: [ ModalService ],
})
export class SharedModule { }
