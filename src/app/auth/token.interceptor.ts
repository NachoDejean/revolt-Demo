import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { Observable, throwError, Subject, empty} from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject =  new Subject();

  constructor(public authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    request = this.addBearer(request);
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);

        if (error.status === 401) {
          return this.refreshAccessToken()
            .pipe(
              switchMap(() => {
                request = this.addBearer(request);
                return next.handle(request);
              }),
              catchError((err: any) => {
                console.log(err);
                this.authService.logout();
                return empty();
              })
            )
        }
        return throwError(error);
      })
    )
  }

  refreshAccessToken() {
    if (this.isRefreshing) {
      return new Observable(observer => {
        this.refreshTokenSubject.subscribe(() => {
          observer.next();
          observer.complete();
        })
      })
    } else {
      this.isRefreshing = true;
      return this.authService.refreshToken().pipe(
        tap(() => {
          //console.log("Access Token Refreshed!");
          this.isRefreshing = false;
          this.refreshTokenSubject.next();
        })
      )
    }  
  }

  addBearer(request: HttpRequest<any>) {  
    const token = this.authService.getAccessToken();
    if (token) {
      return request.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`
        }
      })
    }
    return request;
  }
}