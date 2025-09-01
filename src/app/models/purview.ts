export class Purview {
  id_purview: number
  purview_name: string
  defenition: string

  constructor(id_purview: number, purview_name: string, defenition: string) {
    this.id_purview = id_purview
    this.purview_name = purview_name
    this.defenition = defenition
  }
}

export class PurviewDto {
  purview_name: string
  defenition: string

  constructor( purview_name: string, defenition: string) {
    this.purview_name = purview_name
    this.defenition = defenition
  }
}