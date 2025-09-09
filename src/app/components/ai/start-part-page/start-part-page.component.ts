import { Component, inject, OnInit } from '@angular/core';
import { TestFlowService } from '../../../services/test-flow.service';
import { Router } from '@angular/router';
import { Part } from '../../../models/part';

@Component({
  selector: 'app-start-part-page',
  imports: [],
  templateUrl: './start-part-page.component.html',
  styleUrl: './start-part-page.component.scss'
})
export class StartPartPageComponent implements OnInit {

  testService = inject(TestFlowService)
  router = inject(Router)

  part: Part = {} as Part

  title: string = ''
  description: string = ''

  ngOnInit(): void {
    this.part = this.testService.getCurrentPart()
    this.title = this.part.title
    this.description = this.part.description
  }

  start() {
    this.router.navigate([this.part.pathToNavigate])    
  }

}


