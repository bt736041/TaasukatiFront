import { Component, inject, OnInit } from '@angular/core';
import { selectChatHistory, selectOpenError, selectOpenLoading, selectOpenStatus } from '../../../store/open/open.selectors';
import { Store } from '@ngrx/store';
import { ChatWindowComponent } from '../chat/chat-window/chat-window.component';
import { CommonModule } from '@angular/common';
import { OpenActions } from '../../../store/open/open.actions';
import { filter, map, switchMap, timer } from 'rxjs';
import { Router } from '@angular/router';
import { NavbarService } from '../../../services/navbar.service';
import { SidebarComponent } from '../chat/sidebar/sidebar.component';
import { TestFlowService } from '../../../services/test-flow.service';
import { PartStatus } from '../../../models/part';
import { Location } from '@angular/common';


@Component({
  selector: 'app-open-questions',
  imports: [ChatWindowComponent, SidebarComponent, CommonModule],
  templateUrl: './open-questions.component.html',
  styleUrl: './open-questions.component.scss'
})
export class OpenQuestionsComponent implements OnInit {
  router = inject(Router)
  store = inject(Store);
  location = inject(Location)
  navbarSrevice = inject(NavbarService)
  testFlowService = inject(TestFlowService);

  messages$ = this.store.select(selectChatHistory);
  status$ = this.store.select(selectOpenStatus);
  loading$ = this.store.select(selectOpenLoading);
  error$ = this.store.select(selectOpenError);

  ngOnInit(): void {
  const cameFromReadOnly = sessionStorage.getItem('fromReadOnly') === 'true';

  if (cameFromReadOnly) {
    sessionStorage.removeItem('fromReadOnly');
    return;
  }

    this.store.dispatch(OpenActions.startOpenFlow())

    this.status$.pipe(
      filter(status => status === 'completed'),
      switchMap(status => {
        return timer(3000).pipe(
          map(() => status)
        );
      })
    ).subscribe(() => {

      const isReadOnly = this.router.url.includes('/read-only');
      if (isReadOnly) return;

      this.testFlowService.changeStatus(PartStatus.completed);
      this.router.navigate(['/end-page']),
        this.navbarSrevice.changeButtonsDisabled('false')
    });
  }

  submitAnswer(message: string) {
    this.store.dispatch(OpenActions.submitOpenAnswer({ userAnswer: message }));
  }

}
