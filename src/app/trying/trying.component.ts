import { Component } from '@angular/core';
import { ChatInputComponent } from '../components/ai/chat/chat-input/chat-input.component';
import { ChatMessageComponent } from '../components/ai/chat/chat-message/chat-message.component';
import { StartPartPageComponent } from '../components/ai/start-part-page/start-part-page.component';

@Component({
  selector: 'app-trying',
  imports: [StartPartPageComponent],
  templateUrl: './trying.component.html',
  styleUrl: './trying.component.scss'
})
export class TryingComponent {

  startTest() {
    // Logic to start the test
  }
  
}
