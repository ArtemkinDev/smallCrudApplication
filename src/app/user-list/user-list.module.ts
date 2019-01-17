import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list.component';
import { UserPageComponent } from './user-page/user-page.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../common/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalCustomComponent } from '../../common/shared/modal/modal-custom/modal-custom.component';

@NgModule({
  imports: [
  CommonModule,
    RouterModule,
    SharedModule,
    NgbModule.forRoot()
  ],
  declarations: [
    UserListComponent,
    UserPageComponent
  ],
  entryComponents: [
    ModalCustomComponent,
],
})
export class UserListModule { }
