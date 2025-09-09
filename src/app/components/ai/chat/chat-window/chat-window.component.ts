import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChatMessage } from '../../../../models/chat-message';
import { ChatInputComponent } from '../chat-input/chat-input.component';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AutoScrollBottomDirective } from '../../../../directives/auto-scroll-bottom.directive';



@Component({
  selector: 'app-chat-window',
  imports: [ChatInputComponent,ChatMessageComponent,CommonModule,ScrollingModule,AutoScrollBottomDirective],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss'
})
export class ChatWindowComponent {
  @Input() messages$: Observable<ChatMessage[]> = of([]);
  @Input() disabled = false;
  @Input() completeMassage ='';
  @Input() loading$: Observable<Boolean> = of(false);
  @Input() error$:Observable<String | null> = of(null);

  @Output() sendMessage: EventEmitter<string> = new EventEmitter<string>();

    track = (_: number, m: ChatMessage) => m.timestamp;


  onSendMessage(message: string) {
    this.sendMessage.emit(message);
  }
}
