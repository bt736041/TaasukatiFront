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

  title = 'כמה טוב שבחרת AIM!';
  description = 'הדרך שלך להגיע לעתיד תעסוקתי מושלם. להיות מסופקת. ולהרגיש שאת במקום הנכון.'

ngOnInit(): void {
this.param= this.route.snapshot.paramMap.get
}
}
