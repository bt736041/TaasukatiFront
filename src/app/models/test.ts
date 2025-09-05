
export class Test {
  id: number ;
  date: Date ;
  id_client: number ;

  constructor( id: number , date: Date ,id_client: number){
    this.id= id,
    this.date= date
    this.id_client=id_client
  }
 }
export class TestDto { 
  id_client: number

  constructor(id_client: number){
    this.id_client=id_client
  }
 }
