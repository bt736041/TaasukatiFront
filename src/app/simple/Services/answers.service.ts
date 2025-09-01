import { Injectable, inject } from '@angular/core';
import { GenericService } from '../../database/generic.service';
import { HttpClient } from '@angular/common/http';
import {Answer,AnswerDto} from '../../models/answer'

@Injectable({
  providedIn: 'root'
})
export class AnswersService extends GenericService<Answer, AnswerDto>{

  answers: any[] = []
  constructor(http:HttpClient) {
    super(http, 'api/questions_to_test')
   }

  addAnswer(answer:any) {
    this.answers.push(answer)
    
  }
 
}
