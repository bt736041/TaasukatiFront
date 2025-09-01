import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarService } from '../simple/Services/navbar.service';
import { CounsellorService } from '../simple/Services/counsellor.service';
import { NgModule } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule,
    // Angular Material
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  router = inject(Router);
  navbarService = inject(NavbarService)
  counsellorService = inject(CounsellorService)
  mouseoverLogin: boolean = false;
  users: any[] = [
    { "username": "aliza", "password": "000000000" },
    { "username": "chana", "password": "111111111" },
    { "username": "shoshi", "password": "222222222" },
    { "username": "hadas", "password": "333333333" },
    { "username": "dvora", "password": "1111" },
    { "username": "eti", "password": "2222" },
    { "username": "nomi", "password": "3333" },
    { "username": "zisi", "password": "4444" }]
  message = ''

  formGroup: FormGroup = {} as FormGroup;
  readonly dialogRef = inject(MatDialogRef<LoginComponent>)
  constructor(private formBuilder: FormBuilder) { }


  ngOnInit() {

    this.formGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    const { username, password } = this.formGroup.value;
    const result = this.users.find(user => user.username === username && user.password === password)
    if (result) {
      //this.userService.id = password
      //this.userService.name = username
      //  this.userService.user = password
      this.dialogRef.close()
      if (password.length === 9) {
        this.navbarService.changeNavbar('login_user')
        this.router.navigate(['consulting'],
        );

      }
      else {
        this.navbarService.changeNavbar('login_counsellor')
        this.counsellorService.id = result.id
        this.counsellorService.name = result.firstName
        this.router.navigate(['/counsellor'],
        );

      }

    }
    else {
      this.message = '<p>username or password are not correct</p>'
    }
  }

  onNoClick() {
    this.dialogRef.close();

  }



}
