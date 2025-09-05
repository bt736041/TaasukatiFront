import { Component, Inject, Input, inject,  } from '@angular/core';
import { Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-one-client',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './one-client.component.html',
  styleUrl: './one-client.component.scss'
})
export class OneClientComponent {


router=inject(Router)

@Input() user:any

viewResults(){

this.router.navigate(['one-client-results'],{ queryParams:{ id: this.user.id } })

}

set(){

}

delete(){
  
}


}
