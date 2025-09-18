import { Component, OnInit, inject, ViewChild, ElementRef } from '@angular/core';
import { Router, RouterModule, RouterLink, RouterOutlet } from '@angular/router';
import { NavbarService } from '.././services/navbar.service';
import { filter, Observable, Subscription, take, tap } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, ViewportScroller } from '@angular/common'
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './general/login/login.component';
import { Button, NavBar } from '.././models/nabar';
import { select, Store } from '@ngrx/store';
import { AuthActions } from '.././store/auth/auth.actions';
import { selectIsAuthenticated, selectUserName } from '.././store/auth/auth.selectors';
import { Client } from '../models/client';




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

  buttons: Button[] = []
  dataSubscription: Subscription | undefined;
  readonly dialog = inject(MatDialog)

  goToComponent(path: string) {
    this.router.navigate([path]);
  }

  ngOnInit(): void {
    this.store.dispatch(AuthActions.refresh());

    this.navbarService.navbarData$.pipe(take(1)).subscribe();

    this.dataSubscription = this.navbarService.nav$
      .pipe(filter((nav): nav is NavBar => !!nav))
      .subscribe(nav => {
        this.buttons = nav.buttons;
      })
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
    else {
      this.router.navigate([path])
      if (path == '') {
        this.navbarService.changeNavbar('home')
      }
    }
  }


}
