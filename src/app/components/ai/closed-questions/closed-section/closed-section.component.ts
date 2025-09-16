import { Component, inject, OnInit } from '@angular/core';
import { StartPartPageComponent } from "../../start-part-page/start-part-page.component";
import { TestFlowService } from '../../../../services/test-flow.service';
import { Store } from '@ngrx/store';
import { ClosedActions } from '../../../../store/closed/closed.actions';

@Component({
  selector: 'app-closed-section',
  imports: [StartPartPageComponent],
  templateUrl: './closed-section.component.html',
  styleUrl: './closed-section.component.scss'
})
export class ClosedSectionComponent {
  testService = inject(TestFlowService)
  store = inject(Store)

 

}
