import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ChatMessage } from '../../../../models/chat-message';
import { ChatWindowComponent } from '../chat-window/chat-window.component';
import { Store } from '@ngrx/store';
import { selectChatHistoryByCategoryId, selectClosedCategories } from '../../../../store/closed/closed.selectors';
import { selectChatHistory } from '../../../../store/open/open.selectors';
import { TestFlowService } from '../../../../services/test-flow.service';
import { Part } from '../../../../models/part';
import { ButtonComponent } from '../../../base/button/button.component';

@Component({
  selector: 'app-read-only-chat',
  imports: [ChatWindowComponent, ButtonComponent],
  templateUrl: './read-only-chat.component.html',
  styleUrl: './read-only-chat.component.scss'
})
export class ReadOnlyChatComponent implements OnInit {
  route = inject(ActivatedRoute);
  store = inject(Store);
  testFlowService = inject(TestFlowService)
  router = inject(Router)

  partId = signal<string | null>(null);
  messages$: Observable<ChatMessage[]> = new Observable<ChatMessage[]>();

  readonly loading$ = of(false);
  readonly error$ = of(null);
  readonly completeMessage = 'תצוגת קריאה בלבד';

  part: Part | undefined;


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.partId.set(id);

    if (!id) return;

    this.part = this.testFlowService.getPartByID(id)

    if (id === 'open') {
      this.messages$ = this.store.select(selectChatHistory);
    } else {
      this.store.select(selectClosedCategories).subscribe(categories => {
        const match = categories.find(c => c.name === id || c.id.toString() === id);
        if (match) {
          this.messages$ = this.store.select(selectChatHistoryByCategoryId(match.id));
        }
      });
    }
  }

  returnToFlow() {
    sessionStorage.setItem('fromReadOnly', 'true');
    const current = this.testFlowService.getCurrentPart();
    if (current?.pathToNavigate) {
      this.router.navigate([current.pathToNavigate])
    } else {
      this.router.navigate(['/'])
    }
  }
}