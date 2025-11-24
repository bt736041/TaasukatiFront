import { Component, OnInit, inject, ViewChild, ElementRef } from '@angular/core';
import { Router, RouterModule, RouterLink, RouterOutlet, NavigationEnd } from '@angular/router';
import { NavbarService } from '.././services/navbar.service';
import { filter, Observable, Subscription, switchMap, take, tap } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, ViewportScroller } from '@angular/common'
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './general/login/login.component';
import { Button, NavBar } from '.././models/nabar';
import { select, Store } from '@ngrx/store';
import { AuthActions } from '.././store/auth/auth.actions';
import { selectAuthError, selectIsAuthenticated, selectRedirectUrl, selectUserId, selectUserName } from '.././store/auth/auth.selectors';
import { Client } from '../models/client';
import { selectClient } from '../store/client/client.selectors';
import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterModule, CommonModule, RouterLink, RouterOutlet, MatDialogModule]
})
export class AppComponent implements OnInit {

  logo_src = 'assets/AIM_logo.jpeg'
  title = 'emptyProject';
  router = inject(Router)
  viewportScroller = inject(ViewportScroller)
  navbarService = inject(NavbarService)
  store = inject(Store)
  user_name = this.store.select(selectUserName)
  userId$!: Observable<number | undefined>; 

  buttons: Button[] = []
  dataSubscription: Subscription | undefined;
  readonly dialog = inject(MatDialog)
  constructor(private snackBar: MatSnackBar) {}


  goToComponent(path: string) {
    this.router.navigate([path]);
  }

  ngOnInit(): void {
     this.snackBar.open('טסט Snackbar', 'סגור', {
    duration: 3000,
    direction: 'rtl'
  });

    this.userId$ = this.store.select(selectUserId);
    this.store.dispatch(AuthActions.refresh());

  // שלב 2 – רק אחרי שהניווט הסתיים (כדי שה־router.url יהיה תקף)
  this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    take(1),
    switchMap(() => this.store.select(selectIsAuthenticated).pipe(take(1))),
  ).subscribe((isAuth) => {
    if (!isAuth) {
      const currentUrl = this.router.url;
      console.log('🔁 URL לשמירה אחרי רפרוש:', currentUrl);
      this.store.dispatch(AuthActions.setRedirectURL({ url: currentUrl }));
      this.dialog.open(LoginComponent);
    }
  });

  // ניווט ראשוני
  this.navbarService.navbarData$.pipe(take(1)).subscribe();
  this.dataSubscription = this.navbarService.nav$
    .pipe(filter((nav): nav is NavBar => !!nav))
    .subscribe(nav => {
      this.buttons = nav.buttons;
    });
}


  onClick(path: string, action?: string): void {
    if (action && (action == 'about' || action == 'types')) {
      this.router.navigate(['/home']).then(() => {
          setTimeout(() => {
  const el = document.getElementById(action);
  if (el) {
    const yOffset = -200; // גובה ה-navbar אם קיים
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}, 300); 
      });
    }
    if (action && action === 'logout') {
      this.store.dispatch(AuthActions.logout());
    }
    this.navigate(path)
  }

  navigate(path: string): void {
    if (path === "/login")
      this.dialog.open(LoginComponent)
    else
   if (path === 'results') {
  this.userId$.pipe(take(1)).subscribe(userId => {
    if (userId) {
      this.router.navigate([path, userId]);
    }
  });
}
    else {
      this.router.navigate([path])
      if (path == '') {
        this.navbarService.changeNavbar('home')
      }
    }
  }
}
