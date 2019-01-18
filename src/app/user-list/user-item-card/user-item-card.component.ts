import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserModel } from '../../../common/models/user/user.model';

@Component({
  selector: 'app-user-item-card',
  templateUrl: './user-item-card.component.html',
  styleUrls: ['./user-item-card.component.scss']
})

export class UserItemCardComponent {
  @Input()
  public user: UserModel;

  @Input()
  public index: number;

  @Output()
  public deleteUser: EventEmitter<string> = new EventEmitter<string>();

  public onDelete(id: string):void {
    this.deleteUser.emit(id);
  }
}
