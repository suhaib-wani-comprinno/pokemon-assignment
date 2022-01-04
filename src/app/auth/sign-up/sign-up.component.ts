import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm !: FormGroup;
  userInput: string = '';

  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      usernameInput: new FormControl('', [Validators.required, Validators.minLength(3)])
    })
  }

  onSubmit() {
    this.userInput = this.signUpForm.value.usernameInput;

    if(this.signUpForm.invalid) return;

    return this.authService.createUser(this.userInput).subscribe( () => {
      this.route.navigateByUrl('/');
      sessionStorage.setItem('loggedIn', 'false');
    });
  }
}