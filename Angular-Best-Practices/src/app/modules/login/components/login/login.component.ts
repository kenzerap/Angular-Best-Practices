import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthActions } from '@app/store/actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup = this.fb.group({
    userName: [null, [Validators.required]],
    passWord: [null, [Validators.required]],
  });


  constructor(
    private fb: FormBuilder,
    private store: Store<any>) { }

  ngOnInit() {
  }

  submit() {
    this.store.dispatch(AuthActions.login(this.formGroup.value));
  }

}
