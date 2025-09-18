import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../../../../services/navbar.service';
import { ConfigurationService } from '../../../../services/configuration.service';
import { Store } from '@ngrx/store';
import { ClosedActions } from '../../../../store/closed/closed.actions';
import { ButtonComponent } from '../../../base/button/button.component';
import { selectTypeTest } from '../../../../store/client/client.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-start-the-test',
  imports: [ButtonComponent],
  templateUrl: './start-the-test.component.html',
  styleUrl: './start-the-test.component.scss'
})
export class StartTheTestComponent implements OnInit {
  router = inject(Router);
  store = inject(Store)
  navbarService = inject(NavbarService)
  config = inject(ConfigurationService)
  type_test$!: Observable<any>; // רק הגדרת טיפוס למעלה

  explain_simple: string = "ברוכים הבאים למבחן התעסוקתי המקיף והממצה \n במבחן שלושה חלקים, בכל חלק שאלות של כן ולא, עני על השאלות בכנות \n שימי לב: לא ניתן לשנות את התשובה אחרי שכבר ענית על השאלה, ולא ניתו לחזור אלורה לשאלה קודמת. \n בסיום המבחן יוצגו התוצאות.\n שנתחיל?"
  explain_ai: string = "צריך להכניס כאן הסבר על אופ ביצוע המבחן"

  explain: string = this.explain_simple;

  ngOnInit(): void {

  this.type_test$ = this.store.select(selectTypeTest);
   this.type_test$.subscribe(type => {
      this.explain = type === 'ai' ? this.explain_ai : this.explain_simple;
    });
  }

  start() {
    this.type_test$.subscribe(type => {
      if (type === 'ai') {
        this.store.dispatch(ClosedActions.loadCategories());
        this.router.navigate(['test-ai']);
      } else {
        this.router.navigate(['test']);
      }
      this.navbarService.changeButtonsDisabled('true');
    }).unsubscribe();
  }
}
