import { KeyValueInterface } from '../interfaces/key-value.interface';
export class BaseHelper {
  /**
  * create JsObject from class
  * @param { class }
  * @return { Object }
  */

  public static CreateObjectFromClass(model: any): KeyValueInterface<any> | KeyValueInterface<any>[] {
    if (model instanceof Array) {
      const arrayOfObject = model.map(data => {
        return {...data};
      });
      return arrayOfObject;
    } else {
      return {...model};
    }
  }
}
