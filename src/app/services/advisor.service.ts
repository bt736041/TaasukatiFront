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

  getAdvisors$(): Observable<Advisor[]> {
    return this.get$(new HttpRequestModel({
      url: this._serverUrl,
      action: "get_all"
    }))
  }

  getAdvisorById$(id: number): Observable<Advisor> {
    return this.get$(new HttpRequestModel({
      url: this._serverUrl,
      action: `get_by_id/${id}`
    }))
  }

  updateAdvisor$(advisor: Advisor): Observable<Advisor> {
    return this.put$(new HttpRequestModel({
      url: this._serverUrl,
      action: "update",
      body: advisor
    }))
  }

  deleteAdvisor$(id: number): Observable<any> {
    return this.delete$(new HttpRequestModel({
      url: this._serverUrl,
      action: `delete/${id}`
    }))
  }


}
