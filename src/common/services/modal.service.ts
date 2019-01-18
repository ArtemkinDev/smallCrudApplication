import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SuccessModalComponent } from '../shared/modal/success-modal/success-modal.component';
import { KeyValueInterface } from './../interfaces/key-value.interface';

@Injectable()

export class ModalService {
  constructor(private modalService: NgbModal ) {}
  /**
  * current state with active modal
  */
  private currentActiveModalState: KeyValueInterface<NgbModalRef> = {};

  /**
  * Open custom/default modal
  * @param { component: any, modalId: string }
  * @return { NgbModalRef }
  */
  public openCustomModal(component: any, modalId: string): NgbModalRef {
    const modalRef = this.modalService.open(component);
    this.currentActiveModalState[modalId] = modalRef;

    return modalRef;
  }

  /**
  * Close custom/default modal
  * @param { modalId: string }
  * @return { void }
  */

  public closeCustomModal(modalId: string): void {
    if (this.currentActiveModalState[modalId]) {
      this.currentActiveModalState[modalId].close();
      delete this.currentActiveModalState[modalId];
    }
  }

  /**
  * Open success modal
  * If user doesn't close modal it close after 5 seconds
  * @param { modalId: string, modalContent?: KeyValueInterface<string>,  }
  * @return { NgbModalRef }
  */

  public openSuccessModal(modalId: string, modalContent?: KeyValueInterface<string>): NgbModalRef {
    const modalRef = this.modalService.open(SuccessModalComponent);

    if (!!modalContent) {
      modalRef.componentInstance.title = modalContent.title || 'Success!';
      modalRef.componentInstance.body = modalContent.body || 'Success!';
    } else {
      modalRef.componentInstance.title = 'Success!';
      modalRef.componentInstance.body = 'Success!';
    }

    this.currentActiveModalState[modalId] = modalRef;

    if (this.currentActiveModalState[modalId]) {
      setTimeout(() => {
        this.currentActiveModalState[modalId].close();
        delete this.currentActiveModalState[modalId];
      }, 5000);
    }

    return modalRef;
  }

}
