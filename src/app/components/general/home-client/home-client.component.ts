import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {Router, RouterModule, ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-home-client',
  imports: [RouterModule, CommonModule],
  templateUrl: './home-client.component.html',
  styleUrl: './home-client.component.scss'
})
export class HomeClientComponent implements OnInit {
router= inject(Router)
hideButtons=false
route=inject(ActivatedRoute)
param:any= ''


ngOnInit(): void {
this.param= this.route.snapshot.paramMap.get

}




}
