import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcceptedordersPageRoutingModule } from './acceptedorders-routing.module';

import { AcceptedordersPage } from './acceptedorders.page';
import { ViewmoreAcceptedComponent } from '../viewmore-accepted/viewmore-accepted.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcceptedordersPageRoutingModule
  ],
  declarations: [AcceptedordersPage,ViewmoreAcceptedComponent]
})
export class AcceptedordersPageModule { }
