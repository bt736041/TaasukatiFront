import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-counsellor',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-counsellor.component.html',
  styleUrl: './login-counsellor.component.scss'
})
export class LoginCounsellorComponent {

  router = inject(Router); 
  mouseoverLogin: boolean = false;
  users:any []= [{"username":"aliza","password":"1234"},
  {"username":"chana","password":"5678"},
  {"username":"shoshi","password":"5896"},
  {"username":"hadas","password":"8521"}]
  message=''
 
  formGroup: FormGroup = {}  as FormGroup;

  constructor( private formBuilder: FormBuilder) { }


  ngOnInit() {
   
    this.formGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
     const { username, password } = this.formGroup.value;
     const result= this.users.find(user=>user.username===username && user.password===password)
     if(result)
         this.router.navigate(['/counsellor'],
        {queryParams:{name: username}});
        else{
this.message= '<p>username or password are not correct</p>'
        }
      }

      signUp(){
        
      }
    }