export class Summery_Purview{
  id:number
  id_test:number
  id_purview:number
  summery:number

  constructor(  id:number, id_test:number, id_purview:number, summery:number){
    this.id=id
    this.id_test=id_test
    this.id_purview=id_purview
    this.summery=summery
  }
}

export class Summery_PurviewDto{
  id_test:number
  id_purview:number
  summery:number

  constructor(id_test:number, id_purview:number, summery:number){
    this.id_test=id_test
    this.id_purview=id_purview
    this.summery=summery
  }
}