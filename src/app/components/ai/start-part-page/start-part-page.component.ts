import { Component, inject, OnInit } from '@angular/core';
import { TestFlowService } from '../../../services/test-flow.service';
import { Router } from '@angular/router';
import { Part, PartStatus } from '../../../models/part';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ClosedActions } from '../../../store/closed/closed.actions';
import { ButtonComponent } from '../../base/button/button.component';
import { selectClosedError } from '../../../store/closed/closed.selectors';
import { combineLatest, map, tap } from 'rxjs';
import { selectAiErrorById, selectAiIncompleteById } from '../../../store/results/results.selectors';
import { selectClient, selectStatusTest } from '../../../store/client/client.selectors';

@Component({
  selector: 'app-start-part-page',
  imports: [CommonModule,ButtonComponent],
  templateUrl: './start-part-page.component.html',
  styleUrl: './start-part-page.component.scss'
})
export class StartPartPageComponent {

  testService = inject(TestFlowService)
  router = inject(Router)
  store = inject(Store)
  stasusTest$= this.store.select(selectStatusTest)



  part$ = this.testService.currentPart$;

  start(part: Part) {
    if (part.id === 'closed') {
      this.testService.changeStatus(PartStatus.completed)
      this.testService.incrementPart();
    }
    this.router.navigate([part.pathToNavigate]).then(() => {

    });
  }
}


