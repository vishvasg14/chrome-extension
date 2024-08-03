import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataVerifyComponent } from './data-verify/data-verify.component';

const routes: Routes = [
  {
    path:'',
    component:DataVerifyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataVerifyRoutingModule { }
