import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { NavBar } from '../models/nabar';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  http = inject(HttpClient);

  navbarData$: Observable<NavBar[]>;
  navbarData: NavBar[] = []

  currentNavbarName: string = 'home'

  private currentNav = new BehaviorSubject<NavBar | null>(null)
  nav$ = this.currentNav.asObservable();

  constructor() {
    this.navbarData$ = this.http.get<NavBar[]>('/data/navbar.json').pipe(
      tap(list => {
        this.navbarData = list;
        const cur = list.find(nav => nav.name === this.currentNavbarName) ?? null;
        this.currentNav.next(cur);
      }))
  }

  changeNavbar(name: string) {
    this.currentNavbarName = name;
    const cur = this.navbarData.find(n => n.name === name) ?? null;
    this.currentNav.next(cur);
  }

  getCurrentNavbar() {
    return this.navbarData.filter(nav => nav.name == this.currentNavbarName)[0]
  }

  changeButtonsDisabled(dis: string) {
    this.navbarData[1].buttons.forEach(button => button.disabled = dis)
  }

}
