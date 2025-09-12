import { Component, inject, OnInit } from '@angular/core';
import { TestFlowService } from '../../../services/test-flow.service';
import { Router } from '@angular/router';
import { Part } from '../../../models/part';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-start-part-page',
  imports: [CommonModule],
  templateUrl: './start-part-page.component.html',
  styleUrl: './start-part-page.component.scss'
})
export class StartPartPageComponent {

  testService = inject(TestFlowService)
  router = inject(Router)

  part$ = this.testService.currentPart$;

  start(part: Part) {
    this.router.navigate([part.pathToNavigate]).then(() => {
      this.testService.incrementPart();
    });
  }


}


