import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  navbarData = [
    {
      name: "home", buttons: [{ name: 'כניסה', navigate: '/login', disabled: "false" }, { name: 'אודות', navigate: '', disabled: "false" }, { name: 'נועצות משתפות', navigate: '', disabled: "false" }]
    },
    {
      name: "login_user", buttons: [{ name: 'יציאה', navigate: '', disabled: "false" }, { name: 'עריכת מבחן', navigate: 'startTest', disabled: "false" }, { name: 'צפיה בתוצאות', navigate: 'results', disabled: "false" }]
    },
    {
      name: "login_counsellor", buttons: [{ name: 'יציאה', navigate: '', disabled: "false" }, { name: 'אודות', navigate: '', disabled: "false" }, { name: 'נועצות משתפות', navigate: '', disabled: "false" }]
    }
  ]
  currentNavbarName: string = 'home'

  private currentNav = new BehaviorSubject<any>(this.navbarData.filter(nav => nav.name == this.currentNavbarName)[0]);
  nav$ = this.currentNav.asObservable();

  constructor() { }

  changeNavbar(name: string) {
    this.currentNavbarName = name;
    this.currentNav.next(this.navbarData.filter(nav => nav.name == this.currentNavbarName)[0])
  }

  getCurrentNavbar() {
    return this.navbarData.filter(nav => nav.name == this.currentNavbarName)[0]
  }

  changeButtonsDisabled(dis: string) {
    this.navbarData[1].buttons.forEach(button => button.disabled = dis)
  }

}
