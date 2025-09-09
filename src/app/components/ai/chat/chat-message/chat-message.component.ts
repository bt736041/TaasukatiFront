import { ChangeDetectionStrategy, Component, input, Input } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common'
@Component({
  selector: 'app-chat-message',
  imports: [NgClass, CommonModule],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatMessageComponent {

  @Input() message: string = '';
  @Input() isUser: boolean = false;
  @Input() clarification: boolean = false;

}
