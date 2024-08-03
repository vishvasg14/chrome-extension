import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChromeServiceService } from '../../../chrome-service.service';

@Component({
  selector: 'app-initpage',
  templateUrl: './initpage.component.html',
  styleUrl: './initpage.component.css',
})
export class InitpageComponent implements OnInit {
  constructor(private router: Router,public chromeServiceService: ChromeServiceService) {}

  onGetStarted() {
    this.router.navigate(['signup']);
  }

  ngOnInit(): void {
    this.chromeServiceService.processPluginSize();
  }
}
