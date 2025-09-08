import { Injectable } from '@angular/core';
import { GenericService } from '../../database/generic.service';
import { HttpClient } from '@angular/common/http';
import {Purview,PurviewDto} from '../../models/purview'

@Injectable({
  providedIn: 'root'
})
export class PurviewService extends GenericService<Purview, PurviewDto> {

  constructor(http:HttpClient) {
    super(http, 'api/purviews')
   }
}
