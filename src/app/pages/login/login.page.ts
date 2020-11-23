import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {AuthService} from '../../auth/services/auth.service';
import {tap, map, shareReplay} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {

  userLogin: FormGroup;
  
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' }
    ],
  }

  isLoading: boolean = false;

  constructor(public formBuilder: FormBuilder,
              private backendApi: AuthService) { }
  
  ngOnInit() {
    this.userLogin = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required
      ])),
   });
  }

  login(credentials){
    this.backendApi.loginRequest(credentials).subscribe(
      data => console.log('data subscribe => ', data)
    )
  }

}
