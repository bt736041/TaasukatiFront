import { Injectable } from '@angular/core';
import { Part, PartStatus } from '../models/part';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestFlowService {

  partsData: Part[] = [
    { id: 'closed', title: 'שאלות סגורות', description: 'לפנייך שאלות המחולקות ל - 3 קטגוריות, עני בסגנון של כן או לא', status: PartStatus.idle, pathToNavigate: '/closed' },
    { id: 'category1', title: 'פעילויות', description: '', status: PartStatus.idle, pathToNavigate: '/category' },
    { id: 'category2', title: 'כישורים', description: '', status: PartStatus.idle, pathToNavigate: '/category' },
    { id: 'category3', title: 'מקצועות', description: '', status: PartStatus.idle, pathToNavigate: '/category' },
    { id: 'open', title: 'שאלות פתוחות', description: 'לפנייך שאלות פתוחות שמטרתן ללמוד עליך עוד נתונים משמעותיים למציאת עבודה, השתדלי להשיב בפתיחות ובהרחבה', status: PartStatus.idle, pathToNavigate: '/open' },
  ]

  private currentPartSubject = new BehaviorSubject<Part>(this.partsData[0]);

  currentPart$ = this.currentPartSubject.asObservable();

  getCurrentPart(): Part {
    return this.currentPartSubject.value;
  }

  incrementPart() {
    const current = this.getCurrentPart();
    const nextIndex = this.partsData.indexOf(current) + 1
    const next = this.partsData[nextIndex];
    if (next) {
      this.currentPartSubject.next(next)
    }
  }

  changeStatus(status: PartStatus) :void{
    const current = this.getCurrentPart();
    current.status = status;
    this.currentPartSubject.next({ ...current });  }

  constructor() { }
}

