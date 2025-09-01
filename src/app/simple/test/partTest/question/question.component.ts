import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnswersService } from '../../../simple/Services/answers.service';




@Component({
  selector: 'app-question',
  imports: [CommonModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent {
  @Input() question = ""
  @Input() explanation = ""
  @Output() nextQuestion: EventEmitter<any> = new EventEmitter();
  @Output() answer: EventEmitter<boolean> = new EventEmitter();


  next() {
    this.nextQuestion.emit(null)
  }
  answering(ans: boolean) {
    this.answer.emit(ans)
    this.next()
  }
}
