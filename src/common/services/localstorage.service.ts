import { JsonHelper } from './../helpers/json.helper';
import { KeyValueInterface } from './../interfaces/key-value.interface';
import { Injectable } from '@angular/core';

@Injectable()

export class LocalstorageService {
  private localstorage: Storage = window.localStorage;

  public get (name: string): any {
    const users: any = this.localstorage.getItem(name);
    const params = JsonHelper.parse(users);
    return params;
  }

  public set(name: string, value: KeyValueInterface<string> | KeyValueInterface<string>[]): void {
    this.localstorage.setItem(name, JSON.stringify(value));
  }

  public delete(name: string): void {
    this.localstorage.removeItem(name);
  }
}
