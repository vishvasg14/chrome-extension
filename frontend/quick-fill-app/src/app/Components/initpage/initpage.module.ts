import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InitpageRoutingModule } from './initpage-routing.module';
import { InitpageComponent } from './initpage/initpage.component';


@NgModule({
  declarations: [
    InitpageComponent
  ],
  imports: [
    CommonModule,
    InitpageRoutingModule
  ]
})
export class InitpageModule { }
