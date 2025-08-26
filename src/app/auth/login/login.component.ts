import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  myForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    password: new FormControl('', {
      validators: [
        Validators.minLength(6),
        Validators.required,
        Validators.maxLength(10),
      ],
    }),
  });

  get emailIsInvalid() {
    return (
      this.myForm.controls.email.touched &&
      this.myForm.controls.email.dirty &&
      this.myForm.controls.email.invalid
    );
  }

  get passwordIsInvalid() {
    return (
      this.myForm.controls.password.touched &&
      this.myForm.controls.password.dirty &&
      this.myForm.controls.password.invalid
    );
  }

  onSubmit() {
    console.log(this.myForm);
    const enteredEmail = this.myForm.value.email;
    const enteredPassword = this.myForm.value.password;
  }
}
