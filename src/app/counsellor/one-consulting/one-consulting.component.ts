import { Component, Inject, Input, inject,  } from '@angular/core';
import { Router } from '@angular/router';
import { CounsellorService } from '../../simple/Services/counsellor.service';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-one-consulting',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './one-consulting.component.html',
  styleUrl: './one-consulting.component.scss'
})
export class OneConsultingComponent {


router=inject(Router)

@Input() user:any

viewResults(){

this.router.navigate(['one-consulting-results'],{ queryParams:{ id: this.user.id } })

}

set(){

}

delete(){
  
}


}
