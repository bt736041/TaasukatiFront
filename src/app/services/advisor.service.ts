import { Injectable } from '@angular/core';
import { HttpServiceBase } from './http-service.base';
import { Advisor } from '../models/advisor'
import { Observable } from 'rxjs';
import { HttpRequestModel } from '../models/http-request.model';

@Injectable({
  providedIn: 'root'
})
export class AdvisorService extends HttpServiceBase {

  private get _serverUrl(): string {
    return `${this.config.ips.serverUrl}advisors/`
  }

  createAdvisor$(advisor: Advisor): Observable<Advisor> {
    
    return this.post$(new HttpRequestModel({
      url: this._serverUrl,
      action: "create",
      body: advisor
    }))
  }
}
