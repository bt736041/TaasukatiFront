import { Component } from '@angular/core';
import { ButtonComponent } from '../../base/button/button.component';

@Component({
  selector: 'app-end-test-page',
  imports: [ButtonComponent],
  templateUrl: './end-test-page.component.html',
  styleUrl: './end-test-page.component.scss'
})
export class EndTestPageComponent {
  goToResults() { }
}
