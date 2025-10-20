import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe, AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ResultsActions } from '../../../store/results/results.actions';
import {
  selectAiProfileById,
  selectAiLoadingById,
  selectAiErrorById,
  selectTypes
} from '../../../store/results/results.selectors';
import { GraphDatum, AiProfileResponse } from '../../../models/ai-profile';
import { Observable, filter, map, combineLatest } from 'rxjs';
import { SpinnerComponent } from '../../base/spinner/spinner.component';

@Component({
  selector: 'app-diagnosis-results',
  templateUrl: './diagnosis-results.component.html',
  styleUrls: ['./diagnosis-results.component.scss'],
  imports: [CommonModule, DecimalPipe, AsyncPipe, SpinnerComponent],
  standalone: true,
})
export class DiagnosisResultsComponent implements OnInit {
  testId!: number;

  loading$!: Observable<boolean>;
  error$!: Observable<string | undefined>;
  data$!: Observable<AiProfileResponse | undefined>;
  maxValue$!: Observable<number>;
  groupedGraph$!: Observable<Record<string, GraphDatum[]>>;
  objectKeys = Object.keys;
  typesMap: Record<number, string> = {};
  typesWithStrength$!: Observable<Array<{ id: number; name: string; value: number }>>;

  constructor(private route: ActivatedRoute, private store: Store) {}

ngOnInit(): void {
  const testIdParam = this.route.snapshot.paramMap.get('testId');
  this.testId = Number(testIdParam);

  this.store.dispatch(ResultsActions.loadProfile({ testId: this.testId }));

  this.loading$ = this.store.select(selectAiLoadingById(this.testId));
  this.error$ = this.store.select(selectAiErrorById(this.testId));
  this.data$ = this.store.select(selectAiProfileById(this.testId));

  // ← טיפוסים עם חוזק
  this.typesWithStrength$ = combineLatest([
    this.store.select(selectTypes),
    this.data$
  ]).pipe(
    map(([types, data]) => {
      const graphMap = new Map<string, number>();
      data?.graph_data?.forEach(g => graphMap.set(g.label, g.value));

      return types.map(type => ({
        id: type.id,
        name: type.name,
        value: graphMap.get(type.name) ?? 0
      }));
    })
  );

  const graphData$ = this.data$.pipe(
    filter((res): res is AiProfileResponse => !!res?.graph_data?.length)
  );

  this.maxValue$ = graphData$.pipe(
    map(res => Math.max(1, ...res.graph_data.map(g => g.value)))
  );

  this.groupedGraph$ = graphData$.pipe(
    map(res =>
      res.graph_data.reduce((acc, g) => {
        (acc[g.category] ||= []).push(g);
        return acc;
      }, {} as Record<string, GraphDatum[]>)
    )
  );
}

  widthPercent(value: number, max: number): number {
    return Math.max(0, Math.min(100, (value / max) * 100));
  }
}
