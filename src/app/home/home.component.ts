import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AboutComponent } from '../about/about.component';
import { CustomersTellComponent } from '../customers-tell/customers-tell.component';
import { NavbarService } from '../simple/Services/navbar.service';



@Component({
  selector: 'app-home',
  imports: [AboutComponent,CustomersTellComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  router = inject(Router);
 
}



