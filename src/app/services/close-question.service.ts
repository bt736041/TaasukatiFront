import { Injectable } from '@angular/core';
import { HttpServiceBase } from './http-service.base';
import { CloseAnswer, CloseQuestion } from '../models/close-question';
import { Observable } from 'rxjs';
import { HttpRequestModel } from '../models/http-request.model';

@Injectable({
  providedIn: 'root'
})
export class CloseQuestionService extends HttpServiceBase {


  private get _serverUrl(): string {
    return `${this.config.ips.serverUrl}close-questions/`
  }

  getNewQuestion$(test_id: number, category_id:number): Observable<CloseQuestion> {

    return this.post$(new HttpRequestModel({
      url: this._serverUrl,
      action: "start",
      params: { test_id: test_id, category_id: category_id }
    })
    )
  }

  postAnswer$(answer: CloseAnswer): Observable<CloseQuestion> {

    return this.post$(new HttpRequestModel({
      url: this._serverUrl,
      action: "answer",
      body: answer
    })
    )
  }

}
