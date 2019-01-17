import { UserCreateFormComponent } from './user-create-form/create-form.component';
import { UserModel } from './../../common/models/user/user.model';
import { UserService } from './../../common/services/user.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ModalService } from '../../common/services/modal.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnDestroy {

  public userList: UserModel[];
  public getUsersListSubscription: Subscription;
  public deletUserListSubscription: Subscription;
  public modalServiceSubscription: Subscription;

  constructor(private userService: UserService, private modalService: ModalService) {
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

    const modal = this.modalService.openCustomModal(UserCreateFormComponent);
    this.modalServiceSubscription = modal.componentInstance.newUserToSubscribers.subscribe((user: UserModel) => {
        this.userService.createNewUser(user).subscribe(
          (u: UserModel[]) => {
            this.userList = u;
            this.modalService.closeCustomModal();
          },
          (error) => console.log(error)
        );
    });
  }

  public ngOnDestroy(): void {
    this.getUsersListSubscription.unsubscribe();

    if (!!this.deletUserListSubscription) {
      this.deletUserListSubscription.unsubscribe();
    }

    if (!!this.modalServiceSubscription) {
      this.modalServiceSubscription.unsubscribe();
    }
  }

}
