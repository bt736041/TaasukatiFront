import { Injectable } from '@angular/core';
import { GenericService } from '../../database/generic.service';
import { HttpClient } from '@angular/common/http';
import {Consulting,ConsultingDto} from '../../models/consulting'

@Injectable({
  providedIn: 'root'
})
export class ConsultingService extends GenericService<Consulting, ConsultingDto>{
   constructor(http:HttpClient) {
    super(http, 'api/consultings')
    }
}

