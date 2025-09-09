import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-input',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss'
})
export class ChatInputComponent {

  @Input() disabled: boolean = false;
  @Output() sendMessage: EventEmitter<string> = new EventEmitter<string>();

  message: string = '';
  composing: boolean = false;

  send() {
    if (!this.message.trim()) return
    this.sendMessage.emit(this.message);
    this.message = '';
  }

  onKeydown(event: KeyboardEvent) {
    if (this.composing) return;
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.send();
    }
  }


  onCompositionStart() { this.composing = true; }
  onCompositionEnd() { this.composing = false; }

}
