import { Injectable } from '@angular/core';
import { HttpServiceBase } from './http-service.base';
import { HttpRequestModel } from '../models/http-request.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends HttpServiceBase {

  private get _serverUrl(): string {
    return `${this.config.ips.serverUrl}categories/`
  }

  getCategories$() {
    return this.get$<any[]>(new HttpRequestModel({
      url: this._serverUrl,
      action: "get_all"
    }))
  }
}
