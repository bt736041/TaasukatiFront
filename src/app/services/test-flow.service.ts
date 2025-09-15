import { inject, Injectable, OnInit } from '@angular/core';
import { Part, PartStatus } from '../models/part';
import { BehaviorSubject, filter, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectClosedCategories } from '../store/closed/closed.selectors';

@Injectable({
  providedIn: 'root'
})
export class TestFlowService {

  store = inject(Store)

  categories$ = this.store.select(selectClosedCategories)

  partsData: Part[] = [
    { id: 'closed', part: 'שאלות סגורות', title: 'שאלות סגורות', description: 'לפנייך שאלות המחולקות ל - 3 קטגוריות, עני בסגנון של כן או לא', status: PartStatus.idle, pathToNavigate: '/closed' },
    { id: '1', part: 'שאלות סגורות', title: 'פעילויות מהנות', description: '', status: PartStatus.idle, pathToNavigate: '/category' },
    { id: '2', part: 'שאלות סגורות', title: 'כישורים ויכולות', description: '', status: PartStatus.idle, pathToNavigate: '/category' },
    { id: '3', part: 'שאלות סגורות', title: 'מקצועות שמעניינים אותך', description: '', status: PartStatus.idle, pathToNavigate: '/category' },
    { id: 'open', part: 'שאלות פתוחות', title: 'שאלות פתוחות', description: 'לפנייך שאלות פתוחות שמטרתן ללמוד עליך עוד נתונים משמעותיים למציאת עבודה, השתדלי להשיב בפתיחות ובהרחבה', status: PartStatus.idle, pathToNavigate: '/open' },
  ]

  private currentPartSubject = new BehaviorSubject<Part>(this.partsData[0]);

  currentPart$ = this.currentPartSubject.asObservable();


  constructor() {
    this.categories$.pipe(
      filter(categories => categories.length > 0),
      take(1)
    ).subscribe(categories => {
      this.partsData = this.partsData.map(part => {
        if (part.id === '1') {
          return { ...part, description: categories[0]?.description_ai || '' };
        }
        if (part.id === '2') {
          return { ...part, description: categories[1]?.description_ai || '' };
        }
        if (part.id === '3') {
          return { ...part, description: categories[2]?.description_ai || '' };
        }
        return part;
      });
    });
  }


  getCurrentPart(): Part {
    return this.currentPartSubject.value;
  }

  getPartByID(id: string): Part | undefined {
    return this.partsData.find(part => part.id === id);
  }


  incrementPart() {
    const current = this.getCurrentPart();
    const currentIndex = this.partsData.findIndex(p => p.id === current.id); // <-- שינוי כאן

    const next = this.partsData[currentIndex + 1]; // נשאר אותו דבר
    if (next) {
      this.currentPartSubject.next(next);
    }
  }


  changeStatus(status: PartStatus): void {
    const current = this.getCurrentPart();
    const index = this.partsData.findIndex(p => p.id === current.id);

    if (index !== -1) {
      this.partsData[index] = { ...this.partsData[index], status };
    }
    this.currentPartSubject.next({ ...current, status });
  }


}

