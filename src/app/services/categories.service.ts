import { Injectable } from '@angular/core';
import { HttpServiceBase } from './http-service.base';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { HttpRequestModel } from '../models/http-request.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends HttpServiceBase{

  private get _serverUrl(): string {
    return `${this.config.ips.serverUrl}categories/`
  }

  getCategories$():Observable<Category[]>{
    
    return this.get$(new HttpRequestModel({
      url: this._serverUrl,
      action:'get_all'
    }))
  }

}
