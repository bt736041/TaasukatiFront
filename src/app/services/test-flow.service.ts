import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestFlowService {

  partsData: Part[] = [
    { id: 'closed', title: 'שאלות סגורות', description: 'לפנייך שאלות המחולקות ל - 3 קטגוריות, עני בסגנון של כן או לא', status: PartStatus.idle,pathToNavigate:'/close' },
    { id: 'category1', title: 'פעילויות', description: '', status: PartStatus.idle,pathToNavigate:'' },
    { id: 'category2', title: 'כישורים', description: '', status: PartStatus.idle,pathToNavigate:'' },
    { id: 'category3', title: 'מקצועות', description: '', status: PartStatus.idle,pathToNavigate:'' },
    { id: 'open', title: 'שאלות פתוחות', description: 'לפנייך שאלות פתוחות שמטרתן ללמוד עליך עוד נתונים משמעותיים למציאת עבודה, השתדלי להשיב בפתיחות ובהרחבה', status: PartStatus.idle,pathToNavigate:'/open' },
  ]

currentPart = this.partsData[4]

getCurrentPart(){
  return this.currentPart
}

incrementPart(){
  this.currentPart = this.partsData[this.partsData.indexOf(this.currentPart)]
}

changeStatus(status:PartStatus){
  this.currentPart.status = status
}

  constructor() { }
}import { Part, PartStatus } from '../models/part';

