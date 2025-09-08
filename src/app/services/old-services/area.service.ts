import { Injectable } from '@angular/core';
import { GenericService } from '../../database/generic.service';
import { HttpClient } from '@angular/common/http';

export class Area{
  id_area:number
  area_name:string

  constructor( id_area:number ,area_name:string){
    this.id_area=id_area
    this.area_name=area_name
  }
}

export class AreaDto{

  constructor( ){
    
  }
}


@Injectable({
  providedIn: 'root'
})
export class AreaService extends GenericService<Area, AreaDto>{

  constructor(http:HttpClient) {
    super(http, 'api/areas')
   }
}
