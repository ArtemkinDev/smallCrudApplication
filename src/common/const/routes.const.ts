import { BaseComponent } from '../../app/base/base.component';
import { UserListComponent } from '../../app/user-list/user-list.component';
import { Routes } from '@angular/router';
import { UserPageComponent } from '../../app/user-list/user-page/user-page.component';

export const ROUTES: Routes = [
    {
      path: '',
      component: BaseComponent,
      children: [
        {
          path: '', redirectTo: 'user-list', pathMatch: 'full'
        },
        {
          path: 'user-list', component: UserListComponent
        },
        {
          path: 'user-list/:id', component: UserPageComponent
        }
      ]
    },
];
