import { UserService } from './../../../common/services/user.service';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserModel } from '../../../common/models/user/user.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})

export class UserPageComponent implements OnDestroy {

  public currentUser: UserModel;
  public routerSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
    ) {
    this.routerSubscription = this.activatedRoute.params.subscribe(
      (param: Params): void => {
        const id: string = param.id;

        this.userService.getUserById(id).subscribe((user: UserModel): void => {
          this.currentUser = user;
        },
        () => {
          this.router.navigateByUrl('/not-found');
        }
        );
      }
    );
  }

  public ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

}
