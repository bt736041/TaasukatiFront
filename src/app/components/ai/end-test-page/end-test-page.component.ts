import { Component, inject, OnInit } from '@angular/core';
import { ButtonComponent } from '../../base/button/button.component';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUserId } from '../../../store/auth/auth.selectors';
import { NavbarService } from '../../../services/navbar.service';

@Component({
  selector: 'app-end-test-page',
  imports: [ButtonComponent],
  templateUrl: './end-test-page.component.html',
  styleUrl: './end-test-page.component.scss'
})
export class EndTestPageComponent implements OnInit{
  navbarService = inject(NavbarService)
  router= inject(Router)
  store = inject(Store) 

  ngOnInit(): void {
    this.navbarService.changeButtonsDisabled('false');
  }
  
goToResults() {
 this.store.select(selectUserId).pipe(take(1)).subscribe(userId => {
  this.router.navigate(['/results',userId]);
});

  
}


}
