import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  authObs: Observable<any>;
  isSignUpMode = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onToggleAuthMode() {
    this.isSignUpMode = !this.isSignUpMode;
  }

  onAuthFormSubmit(formObj: NgForm) {
    // Destructure the values from "formObj"
    const { email, password } = formObj.value;

    // Validation check
    if (!email || !password) return;

    // Conditional depending on what "mode" are in
    if (this.isSignUpMode) {
      // Attempt to Sign Up
      this.authObs = this.authService.signUp(email, password);
    } else {
      // Attempt to Sign In
      this.authObs = this.authService.signIn(email, password);
    }

    // Run Observable Logic
    this.authObs.subscribe(
      (res) => {
        console.log('SUCCESS:', res);

        this.router.navigate(['bookshelf']);
      },
      (err) => {
        console.log('ERROR:', err);
      }
    );

    // Reset the form
    formObj.reset();
  }
}
