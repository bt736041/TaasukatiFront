import { Injectable } from '@angular/core';
import {GenericService} from '../../database/generic.service'
import { HttpClient } from '@angular/common/http';
import {Question,QuestionDto} from '../../models/question'

@Injectable({
  providedIn: 'root'
})
export class QuestionsService extends GenericService<Question, QuestionDto> {

  questions = [{id:"895", question: "לתקן מכשירי חשמל ", purviewId: "1" },
  {id:"298", question: "הוראה מתקנת", purviewId: "3" },
  {id:"123", question: "לצבוע את קירות הבית ", purviewId: "1" },
  {id:"456", question: " פאנות", purviewId: "3" },
  {id:"258", question: "אני יודעת לפתור חידות ", purviewId: "2" },
  {id:"111", question: "אני יכולה להנהיג קבוצה", purviewId: "2" }]

  //הצורה הנכונה לאחר שה-שרת יעבוד
  // questions:Question[] = []
  
  parts = [
    { id: "1", title: "פעילויות מהנות", text: "סמני x במשבצת של כן ליד פעילויות שהנך אוהבת לעשות, או שהיית רוצה ללמוד לעשותן  סמני x במשבצת של א ליד פעילויות שאינך אוהבת לעשות או שאין לך כל יחס אליהן ואין לך עניין ללמוד לעשות" },
    { id: "2", title: "כישורים ויכולות", text: " סמני x במשבצת של כן ליד פעילויות שהנך יכולה לעשות טוב או במומחיות סמני x במשבצת של לא ליד פעילויות שמעולם לא ביצעת אותן, או שביצעת אותן ללא הצלחה" },
    { id: "3", title: "מקצועות שמעניינים אותך", text: "סמני x במשבצת של כן ליד מקצועות המעניינים או המושכים אותך   סמני x במשבצת של לא ליד פעילויות שאינך מחבבת או חושבת אותם ללא מעניינים" }
  ]
  currentPart = 0

  
    constructor(http:HttpClient) {
      super(http, 'api/questions')
        //הצורה הנכונה לאחר שה-שרת יעבוד
      // super.getAll().subscribe(response => this.questions = response)
    }


  getQuestionsOfCurrentPart() {
    const currentPurviewId = this.parts[this.currentPart].id
    const quests = this.questions.filter(q => q.purviewId === currentPurviewId);
    if (this.currentPart < this.parts.length )
      this.currentPart++;
    return quests

  }

  getCurrentPart(){
    const currentPurviewId = this.parts[this.currentPart].id
    const part=this.parts.find(p=>p.id===currentPurviewId)  

    return part

  }

  get CurrentPart(){
    return this.currentPart
  }
}
