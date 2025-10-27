import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../base/button/button.component';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-end-test-page',
  imports: [ButtonComponent],
  templateUrl: './end-test-page.component.html',
  styleUrl: './end-test-page.component.scss'
})
export class EndTestPageComponent {
  
  router= inject(Router)
  userId$!: Observable<number | undefined>; 
  


  goToResults() {
 this.userId$.pipe(take(1)).subscribe(userId => {
    if (userId) {
      this.router.navigate(['/results', userId]);
    }
  });
   }
}
