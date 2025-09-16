import { Component, inject } from '@angular/core';
import { Part, PartStatus } from '../../../../models/part';
import { TestFlowService } from '../../../../services/test-flow.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';
import { ChangeDetectorRef, AfterViewInit } from '@angular/core';


interface PartGroup {
  title: string;
  parts: Part[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements AfterViewInit {
  testFlowService = inject(TestFlowService);
  router = inject(Router);

  groupedParts$: Observable<PartGroup[]>;
  currentPart: Part;

  // תוספות חדשות
  totalParts = 0;
  currentIndex = 0;
  totalMessages = 0;
  answeredMessages = 0;

  cd = inject(ChangeDetectorRef);

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

  constructor() {
    this.currentPart = this.testFlowService.getCurrentPart();

    this.groupedParts$ = this.testFlowService.categories$.pipe(
      map(categories => {
        const parts = this.testFlowService.partsData;

        const open = parts.find(p => p.id === 'open');

        const categoriesParts = parts.filter(p => ['1', '2', '3'].includes(p.id));

        const updatedCategories = categoriesParts.map((p, i) => ({
          ...p,
          description: categories[i]?.description_ai || '',
        }));

        const groups: PartGroup[] = [];

        if (updatedCategories.length > 0) {
          groups.push({
            title: 'שלב א: שאלות סגורות',
            parts: updatedCategories,
          });
        }

        if (open) {
          groups.push({
            title: 'שלב ב: שאלות פתוחות',
            parts: [open],
          });
        }        

        // עדכון סטטוס כללי
        const flatParts = [...updatedCategories, ...(open ? [open] : [])];
        this.totalParts = flatParts.length;
        this.currentIndex = flatParts.findIndex(p => p.id === this.currentPart?.id);

        // מונה הודעות – לשדרוג עתידי לפי חישוב אמיתי
        this.totalMessages = 10;
        this.answeredMessages = 7;

        return groups;
      })
    );
  }

  isDone(part: Part): boolean {
    return part.status === PartStatus.completed;
  }

  isCurrent(part: Part): boolean {

    return part.id === this.currentPart?.id;
  }

  goToReadOnly(part: Part): void {

    if (this.isDone(part)) {
      this.router.navigate(['/read-only', part.id]);
    }
  }
}
