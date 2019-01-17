import { UserModel } from './../../common/models/user/user.model';
import { UserService } from './../../common/services/user.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCustomComponent } from '../../common/shared/modal/modal-custom/modal-custom.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnDestroy {

  public userList: UserModel[];
  public getUsersListSubscription: Subscription;
  public deletUserListSubscription: Subscription;

  constructor(private userService: UserService, private modalService: NgbModal) {
    this.getUsersListSubscription = this.userService.getUsersListFromServer().subscribe(
      (u: UserModel[]) => {
      this.userList = u;
      },
      (error) => console.log(error)
    );
  }

  public deleteUser(id: string): void {
    this.deletUserListSubscription = this.userService.deleteUser(id).subscribe(
      (u: UserModel[]) => {
        this.userList = u;
      },
      (error) => console.log(error)
    );
  }

  public showModal(e: Event) {
    e.preventDefault();
    this.modalService.open(ModalCustomComponent);
  }

  public ngOnDestroy(): void {
    this.getUsersListSubscription.unsubscribe();

    if (!!this.deletUserListSubscription) {
      this.deletUserListSubscription.unsubscribe();
    }
  }

}
