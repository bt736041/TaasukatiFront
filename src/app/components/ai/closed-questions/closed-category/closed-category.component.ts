import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectClosedError, selectClosedLoading, selectCurrentCategoryId, selectCurrentCategoryState, selectCurrentChatHistory, selectCurrentClosedStatus } from '../../../../store/closed/closed.selectors';
import { ClosedActions } from '../../../../store/closed/closed.actions';
import { ChatWindowComponent } from '../../chat/chat-window/chat-window.component';
import { CommonModule } from '@angular/common';
import { filter, map, switchMap, take, timer } from 'rxjs';
import { Router } from '@angular/router';
import { SidebarComponent } from '../../chat/sidebar/sidebar.component';
import { TestFlowService } from '../../../../services/test-flow.service';
import { PartStatus } from '../../../../models/part';

@Component({
  selector: 'app-closed-category',
  imports: [ChatWindowComponent, SidebarComponent, CommonModule],
  templateUrl: './closed-category.component.html',
  styleUrl: './closed-category.component.scss'
})
export class ClosedCategoryComponent {
  router = inject(Router);
  store = inject(Store);
  testFlowService = inject(TestFlowService);

  messages$ = this.store.select(selectCurrentChatHistory);
  status$ = this.store.select(selectCurrentClosedStatus);
  loading$ = this.store.select(selectClosedLoading);
  error$ = this.store.select(selectClosedError);

  ngOnInit(): void {
    const cameFromReadOnly = sessionStorage.getItem('fromReadOnly') === 'true';

    if (cameFromReadOnly) {
      sessionStorage.removeItem('fromReadOnly');
      return;
    }

    this.store.select(selectCurrentCategoryId).pipe(
      filter((id): id is number => id != null),
      take(1)
    ).subscribe(() => {
      this.store.dispatch(ClosedActions.startClosedFlow());
    });

    this.status$.pipe(
      filter(status => status === 'categoryCompleted' || status === 'completed'),
      take(1),
      switchMap(status => {
        return timer(3000).pipe(
          map(() => status)
        );
      })
    ).subscribe((status) => {
      const isReadOnly = this.router.url.includes('/read-only');
      if (isReadOnly) return;


      if (status === 'categoryCompleted') {
        this.store.dispatch(ClosedActions.nextCategory());
        this.testFlowService.changeStatus(PartStatus.completed);
      }

      this.testFlowService.changeStatus(PartStatus.completed)
      this.testFlowService.incrementPart();
      this.router.navigate(['/test-ai']);
    });

  }

  submitAnswer(message: string) {
    this.store.dispatch(ClosedActions.submitClosedAnswer({ userAnswer: message }));
  }


}
