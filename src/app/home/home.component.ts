import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AboutComponent } from '../about/about.component';
import { ClientsTellComponent } from '../clients-tell/clients-tell.component';
import { NavbarService } from '../services/navbar.service';



@Component({
  selector: 'app-home',
  imports: [AboutComponent,ClientsTellComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  router = inject(Router);
 
}



