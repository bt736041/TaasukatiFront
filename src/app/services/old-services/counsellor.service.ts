// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { GenericService } from '../../database/generic.service';
// import {Advisor} from '../../models/advisor'

// @Injectable({
//   providedIn: 'root'
// })
// export class CounsellorService <Advisor, CounsellorDto> {

//   constructor(http:HttpClient) {
//     super(http, 'api/counsellors')
//    }
// users=[
//   { "id": "123","username": "aliza", "password": "000000000" , "results":[
//     { purview: "פעילויות", R: 25, I: 12, A: 20, S: 16, E: 7, C: 9, total: 30 },
//     { purview: "כישורים ומיומנויות", R: 25, I: 12, A: 20, S: 16, E: 7, C: 9, total: 25 },
//     { purview: "מקצועות", R: 25, I: 12, A: 20, S: 16, E: 7, C: 9, total: 25 },
//     { purview: 'סה"כ', R: 25, I: 12, A: 20, S: 16, E: 7, C: 9, total: 25}
  
//   ]},
//   {"id": "456", "username": "chana", "password": "111111111" , "results":[
//     { purview: "פעילויות", R: 25, I: 12, A: 20, S: 16, E: 7, C: 9, total: 25 },
//     { purview: "כישורים ומיומנויות", R: 25, I: 12, A: 20, S: 16, E: 7, C: 9, total: 25 },
//     { purview: "מקצועות", R: 25, I: 12, A: 20, S: 16, E: 7, C: 9, total: 25 },
//     { purview: 'סה"כ', R: 25, I: 12, A: 20, S: 16, E: 7, C: 9, total: 25}
  
//   ]},
//   {"id": "789", "username": "shoshi", "password": "222222222" , "results":[
//     { purview: "פעילויות", R: 25, I: 12, A: 20, S: 16, E: 7, C: 9, total: 60 },
//     { purview: "כישורים ומיומנויות", R: 25, I: 12, A: 20, S: 16, E: 7, C: 9, total: 25 },
//     { purview: "מקצועות", R: 25, I: 12, A: 20, S: 16, E: 7, C: 9, total: 25 },
//     { purview: 'סה"כ', R: 25, I: 12, A: 20, S: 16, E: 7, C: 9, total: 25}
  
//   ]},
//   {"id": "963", "username": "hadas", "password": "333333333" , "results":[
//     { purview: "פעילויות", R: 25, I: 12, A: 20, S: 16, E: 7, C: 9, total: 40 },
//     { purview: "כישורים ומיומנויות", R: 25, I: 12, A: 20, S: 16, E: 7, C: 9, total: 25 },
//     { purview: "מקצועות", R: 25, I: 12, A: 20, S: 16, E: 7, C: 9, total: 25 },
//     { purview: 'סה"כ', R: 25, I: 12, A: 20, S: 16, E: 7, C: 9, total: 25}
  
//   ]},]

//   id = ''
//   name = ''

//   currentUser:any= this.users[0]


// changeCurrentUser(username:string){
//   this.currentUser=this.users.find(user=> user.username===username)
// }

// getResultsByCurrentUser(){
//   const response= this.users.find(user =>user.id===this.currentUser.id)
//   if(response)
//   return response.results
// else
// return 
// }

// getUsers(){
//   return this.users
// }




// }
