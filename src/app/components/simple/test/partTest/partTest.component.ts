import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { QuestionComponent } from './question/question.component';
import { Router } from '@angular/router'
import { AnswersService } from '../../../../services/old-services/answers.service';
import { QuestionsService } from '../../../../services/old-services/questions.service';
import { NavbarService } from '../../../../services/navbar.service';


@Component({
  selector: 'app-partTest',
  imports: [QuestionComponent],
  templateUrl: './partTest.component.html',
  styleUrl: './partTest.component.scss'
})
export class PartTestComponent {
  answerService = inject(AnswersService)
  questionService = inject(QuestionsService)
  navbarService = inject(NavbarService)
  router = inject(Router)

  part = this.questionService.getCurrentPart()
  questions = this.questionService.getQuestionsOfCurrentPart();

  partText = this.part ? this.part?.text : ""
  questionIndex = 0
  current_question = this.questions[0].question


  constructor() {
  }

  answering(ans: boolean) {
    const answer = { id_question: this.questions[this.questionIndex].id, answer: ans }
    this.answerService.addAnswer(answer)
  }

  increment_question() {
    if (this.questionIndex < this.questions.length - 1) {
      this.questionIndex++;
      this.current_question = this.questions[this.questionIndex].question;
    }
    else {
      if (this.questionService.CurrentPart < 3) {
        this.router.navigate(['test/introduction'])

      }
      else {
        this.router.navigate(['results'])
        this.navbarService.changeButtonsDisabled('false')
      }
    }
  }
}


