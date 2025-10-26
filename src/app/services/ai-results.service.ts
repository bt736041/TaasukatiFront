import { Injectable } from '@angular/core';
import { HttpServiceBase } from './http-service.base';
import { map, Observable } from 'rxjs';
import { AiProfileResponse } from '../models/ai-profile';
import { HttpRequestModel } from '../models/http-request.model';

@Injectable({
  providedIn: 'root'
})
export class AiResultsService extends HttpServiceBase {
  
   private get _serverUrl(): string {
    return `${this.config.ips.serverUrl}results/`
  }

getProfile$(testId: number): Observable<AiProfileResponse> {
  return this.get$(new HttpRequestModel({
    url: this._serverUrl,
    action: `ai/${testId}`,
  })).pipe(
    map((res: any) => {      
      const raw = res?.body;
      const jsonString = typeof raw === 'string' ? raw : String(raw);
      const parsed = JSON.parse(jsonString);
      return parsed;
    })
  );
}




}
