import { Component } from '@angular/core';
import { ChatInputComponent } from '../components/ai/chat/chat-input/chat-input.component';
import { ChatMessageComponent } from '../components/ai/chat/chat-message/chat-message.component';
import { StartPartPageComponent } from '../components/ai/start-part-page/start-part-page.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../components/base/button/button.component';
import { SpinnerComponent } from '../components/base/spinner/spinner.component';
import { ReadOnlyChatComponent } from '../components/ai/chat/read-only-chat/read-only-chat.component';
import { EndTestPageComponent } from "../components/ai/end-test-page/end-test-page.component";

@Component({
  selector: 'app-trying',
  imports: [ReadOnlyChatComponent, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule, CommonModule, ChatInputComponent, EndTestPageComponent],
  templateUrl: './trying.component.html',
  styleUrl: './trying.component.scss'
})
export class TryingComponent {

  isLoading = false;

  onSubmit() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
  
}
