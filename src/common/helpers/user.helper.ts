import { UserModel } from './../models/user/user.model';
import { KeyValueInterface } from './../interfaces/key-value.interface';

export class UserHelper {

  /**
  * create User model from JS Object
  * @param { data: KeyValueInterface }
  * @return { UserModel }
  */

  public static CreateUserModelFromData( data: KeyValueInterface<any>): UserModel {
    return new UserModel({
      id : data._id,
      guid : data.guid,
      isActive : data.isActive,
      balance : UserHelper.ParseToNumber(data.balance),
      picture : data.picture,
      age : parseInt(data.age, 10),
      name : data.name,
      company : data.company,
      email : data.email,
      phone : data.phone,
      address : data.address,
      about : UserHelper.RemoveUnusedSymbols(data.about),
      registered : UserHelper.ConvertStringToDate(data.registered),
      tags : (!!data.tags && data.tags instanceof Array ? data.tags : []),
    });
  }

  /**
  * create User model from LocalStorage
  * @param { data: KeyValueInterface }
  * @return { UserModel }
  */

  public static CreateUserModelFromLocalStorage( data: KeyValueInterface<any>): UserModel {
    return new UserModel({
      id : data.id,
      guid : data.guid,
      isActive : data.isActive,
      balance : Number(data.balance),
      picture : data.picture,
      age : Number(data.age),
      name : data.name,
      company : data.company,
      email : data.email,
      phone : data.phone,
      address : data.address,
      about : data.about,
      registered : new Date(data.registered),
      tags : data.tags,
    });
  }

  /**
  * create JsObject from UserModel
  * @param { UserModel }
  * @return { Object }
  */

  public static CreateObjectFromClass(model: UserModel): KeyValueInterface<any> {
    const registered = model.registered.toISOString();
    const parsedModel = {...model, registered};

    return parsedModel;
  }

  /**
  * Method to parse balance string to number format
  * @param { balance: string }
  * @return { number }
  */
  public static ParseToNumber(str: string): number  {
    if (!!str) {
      const balance = Number(str.replace(/[^0-9\.]+/g, ''));
      return balance;
    } else {
      return 0;
    }

  }

  /**
  * Method to remove \r\n symbols
  * @param { text: string }
  * @return { text }
  */
  public static RemoveUnusedSymbols(text: string): string {
    if (!!text) {
      const editedText = text.replace(/(\r\n|\n|\r)/gm, '');
      return editedText;
    } else {
      return '';
    }
  }

  /**
  * Method to convert date from string
  * @param { date: string }
  * @return { Date }
  */
  public static ConvertStringToDate(date: string): Date {
    if (!!date) {
      const convertedDate = new Date(date.replace(' ', ''));
      return convertedDate;
    } else {
      return new Date();
    }
  }

}
