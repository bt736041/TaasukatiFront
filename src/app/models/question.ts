export class Question {
  id_question: number;
  question_text: string
  id_type: number;
  id_purview: number

  constructor(id_question: number, question_text: string, id_type: number, id_purview: number) {
    this.id_question = id_question
    this.question_text = question_text
    this.id_type = id_type
    this.id_purview = id_purview
  }
}

 
export class QuestionDto { 
 
  constructor(){
  
  }
 }