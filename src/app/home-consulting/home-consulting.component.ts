import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {Router, RouterModule, ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-home-consulting',
  imports: [RouterModule, CommonModule],
  templateUrl: './home-consulting.component.html',
  styleUrl: './home-consulting.component.scss'
})
export class HomeConsultingComponent implements OnInit {
router= inject(Router)
hideButtons=false
route=inject(ActivatedRoute)
param:any= ''


ngOnInit(): void {
this.param= this.route.snapshot.paramMap.get

}




}
