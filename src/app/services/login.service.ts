import { Injectable } from '@angular/core';
import { HttpServiceBase } from './http-service.base';
import { LoginRequest, LoginResponse, RefreshResponse } from '../models/auth';
import { Observable } from 'rxjs';
import { HttpRequestModel } from '../models/http-request.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends HttpServiceBase {

  private get _serverUrl(): string {
    return `${this.config.ips.serverUrl}auth/`
  }
  login$(request: LoginRequest): Observable<LoginResponse> {
    return this.post$(new HttpRequestModel({
      url: this._serverUrl,
      action: "login",
      body: request
    }))
  }

  logout$(){
    return this.post$(new HttpRequestModel({
      url: this._serverUrl,
      action: "logout"
    }))
  }

  refresh$(): Observable<RefreshResponse> {
    return this.post$(new HttpRequestModel({
      url: this._serverUrl,
      action: "refresh"
    }))
  }
}
