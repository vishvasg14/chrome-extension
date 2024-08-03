import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { SharedServiceService } from '../service/shared-service.service';
import { Router } from '@angular/router';
import { CONSTANTS, ROUTS } from '../constant';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from '../service/local-storage.service';
import { HttpRepositoryService } from '../service/http-repository.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {

  public activeMenuItem: string = 'employees';
  constructor(
    private router: Router,
    private http_repository: HttpRepositoryService,
    private toastr: ToastrService,
    private localStorageService: LocalStorageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  logoutAdmin() {
    this.http_repository.logoutProfile().subscribe(
      (res) => {
        console.log('res', res);
        if (isPlatformBrowser(this.platformId)) {
          this.localStorageService.deleteByKey(CONSTANTS.ACCESS_TOKEN_COOKIE);
          this.router.navigateByUrl('/' + ROUTS.LOGIN);
          console.log('Logout successful');
          this.toastr.success('Logout successful', 'Success');
        }
      },
      (error: any) => {
        console.log('Error:', error);
        this.toastr.error('Logout failed. Please try again.', 'Error');
      }
    );
  }
  // myProfile() {
  //   this.router.navigate(['admin-dashboard', ROUTS.MY_PROFILE]);
  // }
  fetchUsers() {
    // this.router.navigate(['/', ROUTS.GET_ALLUSER]);
    this.router.navigate(['admin-dashboard', ROUTS.GET_ALLUSER]);
  }
  fetchLeaveRequests() {
    this.router.navigate(['admin-dashboard', ROUTS.GET_ALLREQUEST]);
  }

  setActiveMenu(menuItem: string) {
    this.activeMenuItem = menuItem;
  }
}
