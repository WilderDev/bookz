import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const SIGN_UP_URL =
  'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
const SIGN_IN_URL =
  'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenExpTimer: any;

  userToken: string = null;
  currUser = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http
      .post<any>(SIGN_UP_URL + environment.firebaseAPIKey, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(
        tap((res) => {
          const { email, localId, idToken, expiresIn } = res;
          this.handleAuth(email, localId, idToken, +expiresIn);
        })
      );
  }

  signIn(email: string, password: string) {
    return this.http
      .post<any>(SIGN_IN_URL + environment.firebaseAPIKey, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(
        tap((res) => {
          const { email, localId, idToken, expiresIn } = res;
          this.handleAuth(email, localId, idToken, +expiresIn);
        })
      );
  }

  signOut() {
    // Reset the CurrUser BSubject
    this.currUser.next(null);

    // Remove from Local Storage
    localStorage.removeItem('book_user_data');

    if (this.tokenExpTimer) clearTimeout(this.tokenExpTimer);
  }

  autoSignIn() {
    const userData = JSON.parse(localStorage.getItem('book_user_data'));

    if (!userData) return;
    const { email, id, _token, _tokenExpirationDate } = userData;

    const loadedUser = new User(
      email,
      id,
      _token,
      new Date(_tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.currUser.next(loadedUser);

      const expDuration =
        new Date(_tokenExpirationDate).getTime() - new Date().getTime();
      this.autoSignOut(expDuration);
    }
  }

  autoSignOut(expDuration: number) {
    this.tokenExpTimer = setTimeout(() => {
      this.signOut();
    }, expDuration);
  }

  handleAuth(email: string, userId: string, token: string, expiresIn: number) {
    // Create an expiration date for token
    const expDate = new Date(new Date().getTime() + expiresIn * 1000);

    // Create a a new user
    const newUser = new User(email, userId, token, expDate);

    // Store user in BehaviorSubject
    this.currUser.next(newUser);

    // Save the user to Local Storage
    localStorage.setItem('book_user_data', JSON.stringify(newUser));
  }
}
