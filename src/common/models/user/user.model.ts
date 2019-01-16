import { UserInterface } from './../../interfaces/user/user.interface';
export class UserModel  {
  public id: string;
  public guid: string;
  public isActive: boolean;
  public balance: number;
  public picture: string;
  public age: number;
  public name: string;
  public company: string;
  public email: string;
  public phone: string;
  public address: string;
  public about: string;
  public registered: Date;
  public tags: string[];

  constructor(data: UserInterface = {} as UserInterface) {
    this.id = data.id;
    this.guid = data.guid;
    this.isActive = data.isActive;
    this.balance = data.balance;
    this.picture = data.picture;
    this.age = data.age;
    this.name = data.name;
    this.company = data.company;
    this.email = data.email;
    this.phone = data.phone;
    this.address = data.address;
    this.about = data.about;
    this.registered = data.registered;
    this.tags = data.tags;
  }
}
