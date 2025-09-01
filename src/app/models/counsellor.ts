export class Counsellor{
  id_counsellor:number
  first_name:string
  last_name:string
  pass:string
  email:string
  phone:string

  constructor( id_counsellor:number,first_name:string ,last_name:string ,pass:string ,email:string ,phone:string){
this.id_counsellor= id_counsellor
this.first_name=first_name
this.last_name=last_name
this.pass=pass
this.email=email
this.phone=phone
}
}

export class CounsellorDto{
  first_name:string
  last_name:string
  pass:string
  email:string
  phone:string

  constructor( first_name:string ,last_name:string ,pass:string ,email:string ,phone:string){
this.first_name=first_name
this.last_name=last_name
this.pass=pass
this.email=email
this.phone=phone
}
}