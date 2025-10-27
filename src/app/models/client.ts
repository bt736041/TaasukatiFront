export interface Client{
  id?:number
  first_name:string
  last_name:string
  email:string
  phone:string
  password:string
  birth_date:string
  advisor_id:number
  region_id:number
  dominant_type_id?:number
  profile_text?:string
  active_test_id?:number
  status_test?:string
}

