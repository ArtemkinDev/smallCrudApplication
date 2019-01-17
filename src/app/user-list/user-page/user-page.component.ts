import { UserService } from './../../../common/services/user.service';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserModel } from '../../../common/models/user/user.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})

export class UserPageComponent implements OnDestroy {

  public currentUser: UserModel;
  public routerSubscription: Subscription;

  constructor(private router: ActivatedRoute, private userService: UserService) {
    this.routerSubscription = this.router.params.subscribe(
      (param: Params) => {
        const id: string = param.id;

        this.userService.getUserById(id).subscribe((user: UserModel) => {
          this.currentUser = user;
        });
      }
    );
  }

  public ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

}
