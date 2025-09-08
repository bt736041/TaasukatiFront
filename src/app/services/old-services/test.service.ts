import { Injectable } from '@angular/core';
import { GenericService } from '../../database/generic.service';
import { HttpClient } from '@angular/common/http';
import {Test,TestDto } from '../../models/test'
 
@Injectable({
  providedIn: 'root'
})
export class TestService extends GenericService<Test, TestDto>{
  
  constructor(http:HttpClient) {
    super(http, 'api/tests')
   }
}
