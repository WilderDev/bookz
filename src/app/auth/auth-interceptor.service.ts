import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { exhaustMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    return this.authService.currUser.pipe(
      take(1),
      exhaustMap((user) => {
        //   Validate if there is a user
        if (!user) return next.handle(req);

        // Modify the request to contain access token
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token),
        });

        // Return/Next the modified request
        return next.handle(modifiedReq);
      })
    );
  }
}
