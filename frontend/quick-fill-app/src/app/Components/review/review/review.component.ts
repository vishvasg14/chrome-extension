import { Component, OnInit } from '@angular/core';
import { ChromeServiceService } from '../../../chrome-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent implements OnInit {
  constructor(public chromeServiceService: ChromeServiceService, private router: Router) {}

  ngOnInit(): void {
    this.chromeServiceService.processPluginSize();
  }
}
