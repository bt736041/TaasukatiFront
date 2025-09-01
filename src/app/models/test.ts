
export class Test {
  id: number ;
  date: Date ;
  id_consulting: number ;

  constructor( id: number , date: Date ,id_consulting: number){
    this.id= id,
    this.date= date
    this.id_consulting=id_consulting
  }
 }
export class TestDto { 
  id_consulting: number

  constructor(id_consulting: number){
    this.id_consulting=id_consulting
  }
 }
