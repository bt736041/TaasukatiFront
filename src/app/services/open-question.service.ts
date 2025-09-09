import { Injectable } from '@angular/core';
import { HttpServiceBase } from './http-service.base';
import { Observable } from 'rxjs';
import { OpenAnswer, OpenQuestion } from '../models/open-question';
import { HttpRequestModel } from '../models/http-request.model';

@Injectable({
  providedIn: 'root'
})
export class OpenQuestionService extends HttpServiceBase {

  private get _serverUrl(): string {
    return `${this.config.ips.serverUrl}open-questions/`
  }

  getNewQuestion$(test_id: number): Observable<OpenQuestion> {

    return this.post$(new HttpRequestModel({
      url: this._serverUrl,
      action: "start",
      params: { test_id: test_id }
    })
    )
  }

  postAnswer$(answer: OpenAnswer): Observable<OpenQuestion> {

    return this.post$(new HttpRequestModel({
      url: this._serverUrl,
      action: "answer",
      body: answer
    })
    )
  }


}
