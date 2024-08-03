import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataVerifyRoutingModule } from './data-verify-routing.module';
import { DataVerifyComponent } from './data-verify/data-verify.component';



@NgModule({
  declarations: [
    DataVerifyComponent
  ],
  imports: [
    CommonModule,
    DataVerifyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    
  ]
})
export class DataVerifyModule { }
