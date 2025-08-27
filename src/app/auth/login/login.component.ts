import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, of } from 'rxjs';

// custom validator

function mustContainQuestionMark(control: AbstractControl) {
  if (control.value.includes('?')) {
    return null;
  }
  return { doesNotContainQuestionMark: true };
}

//  async validator

function emailIsUnique(control: AbstractControl) {
  if (control.value === 'test@example.com') {
    return of(null);
  }
  return of({ notUnique: true });
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  myForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
      asyncValidators: [emailIsUnique],
    }),
    password: new FormControl('', {
      validators: [
        Validators.minLength(6),
        Validators.required,
        mustContainQuestionMark,
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
  ngOnInit(): void {
    // const savedForm = window.localStorage.getItem('save-login');

    // if (savedForm) {
    //   const loadedForm = JSON.parse(savedForm);
    //   this.myForm.patchValue({
    //     email: loadedForm.email,
    //   });
    // }
    const subscription = this.myForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe({
        next: (val) =>
          window.localStorage.setItem(
            'save-login',
            JSON.stringify({
              email: val.email,
            })
          ),
      });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
  onSubmit() {
    console.log(this.myForm);
    const enteredEmail = this.myForm.value.email;
    const enteredPassword = this.myForm.value.password;
  }
}
