import { Component, inject } from '@angular/core';
import { QuestionsService } from '../../Services/questions.service'
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http';





@Component({
  selector: 'app-intrudaction',
  imports: [],
  templateUrl: './intrudaction.component.html',
  styleUrl: './intrudaction.component.scss'
})
export class IntrudactionComponent {
  questionService= inject(QuestionsService)
  router=inject(Router)
  title=this.questionService.getCurrentPart()?.title
  icons = [{title:"פעילויות מהנות", src:'assets/activities.svg'},{title:"כישורים ויכולות", src:'assets/skills.svg'},{title:"מקצועות שמעניינים אותך", src:'assets/jobs.svg'}]
  icon_src = this.icons.find(icon=>icon.title ==this.title)?.src;

  continue() {
    this.router.navigate(['test/part-test'])
  }
// addTest(){
//   const testDto:TestDto= new TestDto()
//   testDto.id_client=213
//   this.testService.create(testDto)
// }
  
}

