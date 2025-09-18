import { Injectable } from '@angular/core';
import { HttpServiceBase } from './http-service.base';
import { Observable } from 'rxjs';
import { Region } from '../models/region';
import { HttpRequestModel } from '../models/http-request.model';

@Injectable({
  providedIn: 'root'
})
export class RegionService extends HttpServiceBase{

  private get _serverUrl(): string {
    return `${this.config.ips.serverUrl}regions/`
  }

getRegions$():Observable<[Region]>{
    
    return this.get$(new HttpRequestModel({
      url: this._serverUrl,
      action:''
    }))
  }

}
