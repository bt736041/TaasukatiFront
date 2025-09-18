import { Injectable } from '@angular/core';
import { HttpServiceBase } from './http-service.base';
import { LoginRequest, LoginResponse, RefreshResponse } from '../models/auth';
import { Observable } from 'rxjs';
import { HttpRequestModel } from '../models/http-request.model';
import { Client } from '../models/client';

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

  logout$() {
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

  forgotPassword$(email: string): Observable<Client> {
    return this.post$(new HttpRequestModel({
      url: this._serverUrl,
      action: "forgot-password",
      params: { email: email }
    }))
  }

  resetPassword$(token: string, newPassword: string): Observable<void> {
    return this.post$(new HttpRequestModel({
      url: this._serverUrl,
      action: "reset-password",
      params: { token: token, new_password: newPassword }
    }))
  }
}
