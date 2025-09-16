import { Component, Inject, Input, inject,  } from '@angular/core';
import { Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Client } from '../../../../models/client';

@Component({
  selector: 'app-one-client',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './one-client.component.html',
  styleUrl: './one-client.component.scss'
})
export class OneClientComponent {


router=inject(Router)

@Input() client:Client={} as Client

viewResults(){
this.router.navigate(['one-client-results'],{ queryParams:{ id: this.client.id } })

}

set(){

}

delete(){
  
}


}
