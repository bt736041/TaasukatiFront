import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from '../../database/generic.service';

export class Types{
  id_type:number
  type_name: string

  constructor( id_type:number, type_name: string){
    this.id_type=id_type
    this.type_name=type_name
  }
}

export class TypesDto{

}


@Injectable({
  providedIn: 'root'
})
export class TypesService extends GenericService<Types, TypesDto>{

  constructor(http:HttpClient) {
    super(http, 'api/types')
   }
  }