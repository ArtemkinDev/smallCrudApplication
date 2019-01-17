import { Component } from "@angular/core";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal-custom.component.html',
  styleUrls: ['./modal-custom.component.scss'],
})

export class ModalCustomComponent {
  constructor(private modalService: NgbActiveModal) {}

  public close() {
    this.modalService.close();
  }
}
