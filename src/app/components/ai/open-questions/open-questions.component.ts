import { Component, inject, OnInit } from '@angular/core';
import { selectChatHistory, selectOpenError, selectOpenLoading, selectOpenStatus } from '../../../store/open/open.selectors';
import { Store } from '@ngrx/store';
import { ChatWindowComponent } from '../chat/chat-window/chat-window.component';
import { CommonModule } from '@angular/common';
import { OpenActions } from '../../../store/open/open.actions';

@Component({
  selector: 'app-open-questions',
  imports: [ChatWindowComponent, CommonModule],
  templateUrl: './open-questions.component.html',
  styleUrl: './open-questions.component.scss'
})
export class OpenQuestionsComponent implements OnInit {
  store = inject(Store);
  messages$ = this.store.select(selectChatHistory);
  status$ = this.store.select(selectOpenStatus);
  loading$ = this.store.select(selectOpenLoading);
  error$ = this.store.select(selectOpenError);

  ngOnInit(): void {
    this.store.dispatch(OpenActions.startOpenFlow())
  }

  submitAnswer(message: string) {
    this.store.dispatch(OpenActions.submitOpenAnswer({ userAnswer: message }));
  }


}
