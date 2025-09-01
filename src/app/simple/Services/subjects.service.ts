import { Injectable } from '@angular/core';
import { GenericService } from '../../database/generic.service';
import { HttpClient } from '@angular/common/http';
import{Subject,SubjectDto} from '../../models/subject'

@Injectable({
  providedIn: 'root'
})
export class SubjectsService extends GenericService<Subject, SubjectDto>{
  constructor(http:HttpClient) {
    super(http, 'api/subjects')
   }
  
}
