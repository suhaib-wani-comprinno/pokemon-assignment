import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent implements OnInit {
  signInForm !: FormGroup;
  userInfo: any;

  constructor(private authService: AuthService, private route : Router) { }

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      usernameInput: new FormControl('', [Validators.required, Validators.minLength(3)])
    })
  }

  onSubmit() {
    if (sessionStorage.getItem('currentUser')) {
      this.route.navigateByUrl('/trainer')
      alert('Already signed in');
    }
    if (this.signInForm.valid) {
      this.userInfo = this.authService.getUser(this.signInForm.value.usernameInput);
    }
    else return
  }
}