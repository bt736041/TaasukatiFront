export class Answer{
  id:number
  id_test:number
  id_question:number
  answer:boolean

  constructor( id:number, id_test:number, id_question:number ,answer:boolean){
    this.id=id
    this.id_test=id_test
    this.id_question=id_question
    this.answer=answer
  }
}

export class AnswerDto{
  id_test:number
  id_question:number
  answer:boolean

  constructor(id_test:number, id_question:number ,answer:boolean){
    this.id_test=id_test
    this.id_question=id_question
    this.answer=answer
  }
}