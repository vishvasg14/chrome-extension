import { Component, OnInit } from '@angular/core';
import { ChromeServiceService } from '../../../chrome-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  constructor( public chromeServiceService: ChromeServiceService) { }
  ngOnInit(): void {
    
  }

}
