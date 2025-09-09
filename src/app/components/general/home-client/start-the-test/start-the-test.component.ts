import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../../../../services/navbar.service';
import { ConfigurationService } from '../../../../services/configuration.service';

@Component({
  selector: 'app-start-the-test',
  imports: [],
  templateUrl: './start-the-test.component.html',
  styleUrl: './start-the-test.component.scss'
})
export class StartTheTestComponent {
  router = inject(Router);
  navbarService = inject(NavbarService)
  config = inject(ConfigurationService)


  explain: string = "ברוכים הבאים למבחן התעסוקתי המקיף והממצה \n במבחן שלושה חלקים, בכל חלק שאלות של כן ולא, עני על השאלות בכנות \n שימי לב: לא ניתן לשנות את התשובה אחרי שכבר ענית על השאלה, ולא ניתו לחזור אלורה לשאלה קודמת. \n בסיום המבחן יוצגו התוצאות.\n שנתחיל?"


  start() {
    if (this.config.settingConfig.type_test === 'ai')
      this.router.navigate(['test-ai'])
    else
      this.router.navigate(['test'])
    this.navbarService.changeButtonsDisabled('true')

  }
}
