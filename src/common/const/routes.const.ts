import { BaseComponent } from '../../app/base/base.component';
import { UserListComponent } from '../../app/user-list/user-list.component';
import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
      path: '',
      component: BaseComponent,
      children: [
        {
          path: '', component: UserListComponent
        },
      ]
    },
];
