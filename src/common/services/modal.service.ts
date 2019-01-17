import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable()

export class ModalService {
  constructor(private modalService: NgbModal ) {}

  private currentActiveModal: NgbModalRef;

  public openCustomModal(component: any): NgbModalRef {
    const modalRef = this.modalService.open(component);
    this.currentActiveModal = modalRef;

    return modalRef;
  }

  public closeCustomModal(): void {
    if (this.currentActiveModal) {
      this.currentActiveModal.close();
    }
  }
}
