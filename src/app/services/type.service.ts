import { Injectable } from '@angular/core';
import { HttpServiceBase } from './http-service.base';
import { Observable } from 'rxjs';
import { Type } from '../models/types';
import { HttpRequestModel } from '../models/http-request.model';

@Injectable({
  providedIn: 'root'
})
export class TypeService extends HttpServiceBase {

   private get _serverUrl(): string {
    return `${this.config.ips.serverUrl}types/`
  }

   getTypes$():Observable<Type[]>{
      return this.get$(new HttpRequestModel({
        url: this._serverUrl,
        action:''
      }))
    }

}
