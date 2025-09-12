import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectClosedError, selectClosedLoading, selectCurrentCategoryId, selectCurrentCategoryState, selectCurrentChatHistory, selectCurrentClosedStatus } from '../../../../store/closed/closed.selectors';
import { ClosedActions } from '../../../../store/closed/closed.actions';
import { ChatWindowComponent } from '../../chat/chat-window/chat-window.component';
import { CommonModule } from '@angular/common';
import { filter, map, switchMap, take, timer } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-closed-category',
  imports: [ChatWindowComponent, CommonModule],
  templateUrl: './closed-category.component.html',
  styleUrl: './closed-category.component.scss'
})
export class ClosedCategoryComponent {
  router = inject(Router)
  store = inject(Store);

  messages$ = this.store.select(selectCurrentChatHistory);
  status$ = this.store.select(selectCurrentClosedStatus);
  loading$ = this.store.select(selectClosedLoading);
  error$ = this.store.select(selectClosedError);

  ngOnInit(): void {
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
      if (status === 'categoryCompleted') {
        this.store.dispatch(ClosedActions.nextCategory());
      }
      this.router.navigate(['/test-ai']);
    });

  }

  submitAnswer(message: string) {
    this.store.dispatch(ClosedActions.submitClosedAnswer({ userAnswer: message }));
  }


}
