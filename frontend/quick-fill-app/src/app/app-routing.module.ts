import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    redirectTo:'intianlpage',
    pathMatch:'full'
  },
  {
    path:'intianlpage',
    loadChildren: () =>import('../app/Components/initpage/initpage.module').then(a=>a.InitpageModule)
  }, 
  {
    path:'start',
    loadChildren: () =>import('../app/Components/start/start.module').then(a=>a.StartModule)
  },
  { 
    path: 'login',
    loadChildren: () =>import('../app/Components/login/login.module').then(m => m.LoginModule)
  },
  { 
    path: 'signup',
    loadChildren: () =>import('../app/Components/signup/signup.module').then(m => m.SignupModule)
  },
  { 
    path: 'dashboard',
    loadChildren: () =>import('../app/Components/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  { 
    path: 'review',
    loadChildren: () =>import('../app/Components/review/review.module').then(m => m.ReviewModule)
  },
  { 
    path: 'data-verification',
    loadChildren: () =>import('../app/Components/data-verify/data-verify.module').then(m => m.DataVerifyModule)
  },
  { 
    path: 'terms-condition',
    loadChildren: () =>import('../app/Components/term-condition/term-condition.module').then(m => m.TermConditionModule)
  },
  { 
    path: '',
    redirectTo: '/login', 
    pathMatch: 'full'
  },
  { 
    path: '**',
    redirectTo: '/login'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
