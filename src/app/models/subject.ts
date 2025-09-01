export class Subject{
  id_subject:number
  subject_name:string
  description:string

  constructor( id_subject:number ,subject_name:string, description:string){
    this.id_subject=id_subject
    this.subject_name=subject_name
    this.description=description
  }
}

export class SubjectDto{
  subject_name:string
  description:string

  constructor(subject_name:string, description:string){
    this.subject_name=subject_name
    this.description=description
  }
}
