import { Injectable } from '@angular/core';
import { GenericService } from '../../database/generic.service';
import { HttpClient } from '@angular/common/http';

export class Summery_Type{
  id:number
  id_test:number
  id_type:number
  summery:number

  constructor(  id:number, id_test:number, id_type:number, summery:number){
    this.id=id
    this.id_test=id_test
    this.id_type=id_type
    this.summery=summery
  }
}

export class Summery_TypeDto{
  id_test:number
  id_type:number
  summery:number

  constructor(id_test:number, id_type:number, summery:number){
    this.id_test=id_test
    this.id_type=id_type
    this.summery=summery
  }
}

@Injectable({
  providedIn: 'root'
})
export class SummeryByPurviewService extends GenericService<Summery_Type, Summery_TypeDto>{

  constructor(http:HttpClient) {
    super(http, 'api/summeries_by_types')
   }
  
}