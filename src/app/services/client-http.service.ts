import { Injectable } from '@angular/core';
import { HttpServiceBase } from './http-service.base';
import { Client } from '../models/client'
import { Observable } from 'rxjs';
import { HttpRequestModel } from '../models/http-request.model';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ClientHttpService extends HttpServiceBase {

  private get _serverUrl(): string {
    return `${this.config.ips.serverUrl}clients/`
  }

  createClient$(client: Client,test_type:string): Observable<Client> {
    
    return this.post$(new HttpRequestModel({
      url: this._serverUrl,
      action: "create",
      body: client,
      params:{test_type:test_type}
        }))
  }
}


