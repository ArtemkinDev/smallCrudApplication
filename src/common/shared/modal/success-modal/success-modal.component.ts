import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.scss']
})

export class SuccessModalComponent {
  @Input()
  public title: string;

  @Input()
  public body: string;

  constructor(private activeModal: NgbActiveModal) {}

  public closeModal() {
    this.activeModal.close();
  }

}
