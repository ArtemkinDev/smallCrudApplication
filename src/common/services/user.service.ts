import { LocalstorageService } from './localstorage.service';
import { UserHelper } from './../helpers/user.helper';
import { UserModel } from './../models/user/user.model';
import { KeyValueInterface } from './../interfaces/key-value.interface';

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Observer } from 'rxjs/Observer';
import { BaseHelper } from '../helpers/base.helpers';

@Injectable()

export class UserService {
  private fake_URL = '../../assets/data/users.json';

  constructor(private http: HttpClient, private localstorage: LocalstorageService) {}

  /**
  * Get Users from fake DB
  * @return { Observable<UserModel[]> }
  */

  public getUsersListFromServer(): Observable<UserModel[]> {
    return Observable.create((observer: Observer<UserModel[]>  ) => {
      this.http.get<KeyValueInterface<any>[]>(
        this.fake_URL
        ).subscribe(
          (data: KeyValueInterface<any>[]): void  => {
            const dataModel: UserModel[] = data.map<UserModel>(
              (u: KeyValueInterface<any>): UserModel => UserHelper.CreateUserModelFromData(u)
            );

            observer.next(dataModel);
            this.updateLocalStorage(dataModel);
          },
          (error: HttpErrorResponse): void => console.log(error),
          (): void => observer.complete()
      );
    });
  }

  /**
  * Get User from fake DB
  * @param { id: string }
  * @return { Observable<UserModel> }
  */

  public getUserById(id: string): Observable<UserModel> {
    return this.http.get<KeyValueInterface<any>[]>(this.fake_URL).pipe(
      map<KeyValueInterface<any>[], UserModel>(
        (users: KeyValueInterface<any>[]) => {
          const user: KeyValueInterface<any> = users.filter((u: KeyValueInterface<any>) => u._id === id)[0];
          return UserHelper.CreateUserModelFromData(user);
        }
      )
    );
  }

  /**
  * Take user from localstorage, delete user by id, then return new userListModel
  * If we had a real API we must send delete request and after that update localstorage or state
  * @param { id: string }
  * @return { Observable<UserModel[]> }
  */

  public deleteUser(id: string): Observable<UserModel[]> {
    return Observable.create((observer: Observer<UserModel[]>  ) => {

      const userList: KeyValueInterface<any>[] = this.localstorage.get('userList');

      const userListModel =  userList
              .filter((u: KeyValueInterface<any>) =>  u.id !== id)
              .map<UserModel>(
                (u: KeyValueInterface<any>): UserModel => UserHelper.CreateUserModelFromLocalStorage(u)
              );

      observer.next(userListModel);
      this.updateLocalStorage(userListModel);
    });
  }

  private updateLocalStorage(model: UserModel[]): void {
    this.localstorage.delete('userList');
    this.localstorage.set('userList', BaseHelper.CreateObjectFromClass(model));
  }

}
