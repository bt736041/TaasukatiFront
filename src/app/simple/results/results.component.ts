import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

import { HttpClient } from '@angular/common/http';


const ELEMENT_DATA: any[] = [
  { purview: "פעילויות", R: 25, I: 12, A: 20, S: 16, E: 7, C: 9, total: 25 },
  { purview: "כישורים ומיומנויות", R: 25, I: 12, A: 20, S: 16, E: 7, C: 9, total: 25 },
  { purview: "מקצועות", R: 25, I: 12, A: 20, S: 16, E: 7, C: 9, total: 25 },
  { purview: 'סה"כ', R: 25, I: 12, A: 20, S: 16, E: 7, C: 9, total: 25 }

];

@Component({
  selector: 'app-results',
  imports: [MatTableModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss',
})
export class ResultsComponent {
  router = inject(ActivatedRoute)
  displayedColumns: string[] = ['purview', 'R', 'I', 'A', 'S', 'E', 'C', 'total'];
  results = ELEMENT_DATA
  user_id = this.router.snapshot.paramMap.get('id')
  profile: string = "you are great"

  constructor(private http:HttpClient){
  }
}