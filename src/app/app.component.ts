import { Component, OnInit, inject, ViewChild, ElementRef } from '@angular/core';
import { Router, RouterModule, RouterLink, RouterOutlet } from '@angular/router';
import { NavbarService } from './simple/Services/navbar.service';
import { Subscription } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common'
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';




@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterModule, CommonModule, RouterLink, RouterOutlet,MatDialogModule ]
})
export class AppComponent implements OnInit {

  @ViewChild('about') targetElement!: ElementRef;

  logo_src = 'assets/logo.png'
  title = 'emptyProject';
  router = inject(Router)
  navbarService = inject(NavbarService)
  buttons: any
  dataSubscription: Subscription | undefined;
  readonly dialog = inject(MatDialog)

  goToComponent(path: string) {
    this.router.navigate([path]);
  }

  // openDialog(path: string): void {
  //   console.log(name);
  // }

  ngOnInit(): void {
    this.dataSubscription = this.navbarService.nav$.subscribe(data => {
      this.buttons = data.buttons;
    })
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

  scrollToElement() {
    console.log(this.targetElement);

    const element = this.targetElement.nativeElement;
    if (element) {

      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

}
