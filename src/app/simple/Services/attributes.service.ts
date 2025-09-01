import { Injectable } from '@angular/core';
import { GenericService } from '../../database/generic.service';
import { HttpClient } from '@angular/common/http';

export class Attributes{
  id:number
  description:string
  id_type:number
  score:number
  must_type:number

  constructor(  id:number ,description:string ,id_type:number, score:number, must_type:number){
    this.id=id
    this.description=description
    this.id_type=id_type
    this.score=score
    this.must_type=must_type
  }
}

export class AttributesDto{
  description:string
  id_type:number
  score:number
  must_type:number

  constructor(description:string ,id_type:number, score:number, must_type:number ){
    this.description=description
    this.id_type=id_type
    this.score=score
    this.must_type=must_type
  }
}




@Injectable({
  providedIn: 'root'
})
export class AttributesService extends GenericService<Attributes, AttributesDto>{

   constructor(http:HttpClient) {
    super(http, 'api/attributes')
    }
}
