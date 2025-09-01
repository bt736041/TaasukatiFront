export class Consulting{
  id_consulting:number
  id_counsellor:number
  first_name:string
  last_name:string
  password:string
  email:string
  phone:string
  id_area:number
  id_dominant_type:number
  profile:number

  constructor( id_consulting:number, id_counsellor:number, first_name:string, last_name:string, password:string, email:string, phone:string, id_area:number, id_dominant_type:number, profile:number){
  this.id_consulting=id_consulting
  this.id_counsellor=id_counsellor
  this.first_name=first_name
  this.last_name=last_name
  this.password=password
  this.email=email
  this.phone=phone
  this.id_area=id_area
  this.id_dominant_type=id_dominant_type
  this.profile=profile
  }
}


export class ConsultingDto{
  id_counsellor:number
  first_name:string
  last_name:string
  password:string
  email:string
  phone:string
  id_area:number

  constructor(  id_counsellor:number, first_name:string, last_name:string, password:string, email:string, phone:string, id_area:number){
  this.id_counsellor=id_counsellor
  this.first_name=first_name
  this.last_name=last_name
  this.password=password
  this.email=email
  this.phone=phone
  this.id_area=id_area
  }
}