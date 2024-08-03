import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChromeServiceService } from '../../../chrome-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpRepositoryService } from '../../../Services/http-repository.service';
import { LocalStorageService } from '../../../Services/local-storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  formSubmitted: any;
  public signupForm: any = {};
  constructor(
    public chromeServiceService: ChromeServiceService,
    private router: Router,
    public formBuilder: FormBuilder,
    public httpRepositoryService: HttpRepositoryService,
    public localStorageService: LocalStorageService
  ) {
    this.signupForm = FormGroup;
  }
  onlogin() {
    this.router.navigate(['login']);
  }

  ngOnInit(): void {
    this.chromeServiceService.processPluginSize();
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      // terms: [false, [Validators.required]],
    });
  }
  onSubmit() {
    if (!this.signupForm.valid) {
      return this.signupForm.markAllAsTouched();
    }
    
    this.httpRepositoryService.registration(this.signupForm.value).subscribe(
      (response: any) => {
        this.localStorageService.set('user', JSON.stringify(response));
        console.log('response', response);
        // this.router.navigateByUrl('start' + '/' + ROUTS.REGISTRATION);
      },
      (error: any) => {
        console.log('error', error);
      });
    
  }
  onTerms() {
    this.router.navigate(['terms-condition']);
  }
}
