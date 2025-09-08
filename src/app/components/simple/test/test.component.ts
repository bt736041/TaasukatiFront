import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PartTestComponent } from './partTest/partTest.component';
import { QuestionsService } from '../../../services/old-services/questions.service';



@Component({
  selector: 'app-test',
  imports: [RouterModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {

  router = inject(Router)
  questionService = inject(QuestionsService)

  // questions = this.questionService.getQuestions()
  // parts = this.questionService.getParts()

  currentPart = 0

  constructor() {
    this.router.navigate(['test/introduction'])
  }



}
