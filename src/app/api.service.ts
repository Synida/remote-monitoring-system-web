import {EventEmitter, Injectable, Output} from '@angular/core';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  redirectUrl: string;
  baseUrl: string = "http://localhost:8080";
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  constructor(private httpClient: HttpClient) {
  }

  public userLogin(email, password) {
    return this.httpClient.post<any>(this.baseUrl + '/login', {email, password})
      .pipe(map(Users => {
        this.setToken(Users.token);
        this.getLoggedInName.emit(true);
        return Users;
      }));
  }

  //token
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    const userToken = this.getToken();
    return userToken !== null;
  }
}
