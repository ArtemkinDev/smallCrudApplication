import { Component } from "@angular/core";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal-custom.component.html',
  styleUrls: ['./modal-custom.component.scss'],
  providers: [ NgbModal ]
})

export class ModalCustomComponent {
  constructor(private modalService: NgbModal) {}

  open(content) {
    this.modalService.open(content);
  }
}
