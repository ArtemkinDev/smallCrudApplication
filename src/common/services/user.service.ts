import { LocalstorageService } from './localstorage.service';
import { UserHelper } from './../helpers/user.helper';
import { UserModel } from './../models/user/user.model';
import { KeyValueInterface } from './../interfaces/key-value.interface';

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

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
            observer.complete();
            this.updateLocalStorage(dataModel);
          },
          (error: HttpErrorResponse): void => observer.error(error),
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
    return Observable.create((observer: Observer<UserModel>  ) => {

      const userList: KeyValueInterface<any>[] = this.localstorage.get('userList');
      const user: KeyValueInterface<any> =  userList.filter((u: KeyValueInterface<any>) => u.id === id)[0];

      if(!!user) {
        observer.next(UserHelper.CreateUserModelFromLocalStorage(user));
      } else {
        observer.error(void 0);
      };

      observer.complete();
    });
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
      observer.complete();
      this.updateLocalStorage(userListModel);
    });
  }


  /**
  * Create new user
  * If we had a real API we must send post request and after that update localstorage or state
  * @param { id: string }
  * @return { Observable<UserModel[]> }
  */

  public createNewUser(newUser: UserModel): Observable<UserModel[]> {
    return Observable.create((observer: Observer<UserModel[]>  ) => {

      const userList: KeyValueInterface<any>[] = this.localstorage.get('userList');

      const userListModel =  [...userList, newUser]
              .map<UserModel>(
                (u: KeyValueInterface<any>): UserModel => UserHelper.CreateUserModelFromLocalStorage(u)
              );
      // emit server response
      setTimeout(() => {
        observer.next(userListModel);
        observer.complete();
        this.updateLocalStorage(userListModel);
      }, 500);
    });
  }

  private updateLocalStorage(users: UserModel[]): void {
    const usersParse = users.map<KeyValueInterface<any>>((u: UserModel) => UserHelper.CreateObjectFromClass(u));
    this.localstorage.delete('userList');
    this.localstorage.set('userList', usersParse);
  }

}
