import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { shareReplay, tap, catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { Observable } from 'rxjs';

const baseUrl = "https://dev.revolt.city";

@Injectable({
  providedIn: "root",
})
export class AuthService {

  private readonly ACCESS_TOKEN = "ACCESS_TOKEN";
  private readonly REFRESH_TOKEN = "REFRESH_TOKEN";

  constructor(private http: HttpClient, private router: Router) {}

  loginRequest(credentials): Observable<any> {
    return this.http
      .post(`${baseUrl}/api/login`, {
        login: credentials.email,
        password: credentials.password,
      })
      .pipe(
        shareReplay(),
        tap((res: any) => {
          if(res.access_token != null || res.refresh_token != null){
            this.storeSession(res.access_token, res.refresh_token);
            this.router.navigate(["/home"]);
          } else {
            alert('User or password are incorrect');
          }
        }),
        catchError((error: any) => {
          return this.handleError(error)
        })
      );
  }

  storeSession(accessToken: string, refreshToken: string) {
    localStorage.setItem(this.ACCESS_TOKEN, accessToken);
    localStorage.setItem(this.REFRESH_TOKEN, refreshToken);
  }

  storeAccessToken(token: string) {
    localStorage.setItem(this.ACCESS_TOKEN, token);
  }

  removeSession() {
    localStorage.removeItem(this.ACCESS_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

  getAccessToken() {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }

  getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  refreshToken() {
    return this.http.post(`${baseUrl}/api/refresh`, {
        refresh_token: this.getRefreshToken(),
    })
    .pipe(
      tap((token: any) => this.storeAccessToken(token.access_token)),
      catchError(error => this.handleError(error))
    );
  }

  isLoggedIn() {
    return !!this.getAccessToken();
  }

  logout() {
    this.removeSession();
    this.router.navigate(["/login"]);
  }

  handleError(error) {
    alert(error.error)
    return error;
  }
}
