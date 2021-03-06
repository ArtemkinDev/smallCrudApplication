import { UserCreateFormComponent } from './user-create-form/create-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list.component';
import { UserPageComponent } from './user-page/user-page.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../common/shared/shared.module';
import { UserItemCardComponent } from './user-item-card/user-item-card.component';


@NgModule({
  imports: [
  CommonModule,
    RouterModule,
    SharedModule,
  ],
  declarations: [
    UserListComponent,
    UserPageComponent,
    UserCreateFormComponent,
    UserItemCardComponent
  ],
  entryComponents: [
    UserCreateFormComponent,
  ],
})
export class UserListModule { }
