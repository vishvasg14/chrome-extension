import { Component } from '@angular/core';
import { ChromeServiceService } from '../../../chrome-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-term-condition',
  templateUrl: './term-condition.component.html',
  styleUrl: './term-condition.component.css',
})
export class TermConditionComponent {

  constructor(public chromeServiceService: ChromeServiceService, private router: Router) {}
  acceptTerms() {
    this.router.navigate(['signup']);
  }
}
