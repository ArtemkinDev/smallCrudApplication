import { KeyValueInterface } from './../../../common/interfaces/key-value.interface';
import { UserModel } from './../../../common/models/user/user.model';
import { Component, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../../common/validators/custom.validator';


@Component({
  selector: 'app-user-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss'],
})

export class UserCreateFormComponent {

  @Output()
  public newUserToSubscribers: EventEmitter<UserModel> = new EventEmitter<UserModel>();

  public createUserForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(12)]],
    email: ['', [Validators.required, CustomValidators.emailValidator]],
    company: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(12)]],
  });
  public submit: boolean;

  constructor(private modalService: NgbActiveModal, private formBuilder: FormBuilder) {}

  public close() {
    this.modalService.close();
  }


  public onSubmit() {
    this.submit = true;

    if (!this.createUserForm.invalid) {
      const loginInfo: KeyValueInterface<string> = this.createUserForm.value;

      const newUser: UserModel = {} as UserModel;

      newUser.id = new Date().getTime().toString();
      newUser.picture = 'http://placehold.it/32x32';
      newUser.name = loginInfo.username;
      newUser.email = loginInfo.email;
      newUser.company = loginInfo.company;
      newUser.registered = new Date();

      this.newUserToSubscribers.emit(new UserModel(newUser));
    } else {
      return;
    }
  }
}
