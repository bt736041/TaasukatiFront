import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AiResultsService } from '../../../services/ai-results.service';
import { AiProfileResponse, GraphDatum } from '../../../models/ai-profile';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-diagnosis-results',
  templateUrl: './diagnosis-results.component.html',
  imports: [DecimalPipe, CommonModule],
  styleUrls: ['./diagnosis-results.component.scss']
})
export class DiagnosisResultsComponent implements OnInit {
  loading = true;
  error?: string;
  data?: AiProfileResponse;

  maxValue = 1;
  groupedGraph: Record<string, GraphDatum[]> = {};

  constructor(
    private route: ActivatedRoute,
    private svc: AiResultsService,
  ) {}

  ngOnInit(): void {
    const testIdParam = this.route.snapshot.paramMap.get('testId');
    const testId = Number(testIdParam);

    if (!testId || Number.isNaN(testId)) {
      this.error = 'testId לא תקין בנתיב ה-URL';
      this.loading = false;
      return;
    }

    this.svc.getProfile$(testId).subscribe({
      next: (res) => {
        this.data = res;
        const values = res.graph_data?.map(g => g.value) || [];
        this.maxValue = Math.max(1, ...values);
        this.groupedGraph = (res.graph_data || []).reduce((acc, g) => {
          (acc[g.category] ||= []).push(g);
          return acc;
        }, {} as Record<string, GraphDatum[]>);
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.detail || 'בקשה נכשלה';
        this.loading = false;
      }
    });
  }

  widthPercent(value: number): number { return Math.max(0, Math.min(100, (value / this.maxValue) * 100)); }
}