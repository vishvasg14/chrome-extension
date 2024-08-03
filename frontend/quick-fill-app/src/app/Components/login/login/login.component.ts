import { Component, OnInit } from '@angular/core';
import { ChromeServiceService } from '../../../chrome-service.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpRepositoryService } from '../../../Services/http-repository.service';
import { LocalStorageService } from '../../../Services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm: any = {};
  public formSubmitted: any = {};
  constructor(
    public chromeServiceService: ChromeServiceService,
    private router: Router,
    public formBuilder: FormBuilder,
    public httpRepositoryService: HttpRepositoryService,
    public localStorageService: LocalStorageService
  ) {
    this.loginForm = FormGroup;
  }

  ngOnInit(): void {
    this.chromeServiceService.processPluginSize();
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  backToSignup() {
    this.router.navigate(['signup']);
  }
  onLogin() {
    if (!this.loginForm.valid) {
      return this.loginForm.markAllAsTouched();
    }
    this.httpRepositoryService.login(this.loginForm.value).subscribe(
      (response: any) => {
        this.localStorageService.set('user', JSON.stringify(response));
        this.router.navigateByUrl('start');
      },
      (error: any) => {
        console.log('error', error);
      }
    );
    
  }
}
