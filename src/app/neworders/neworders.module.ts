import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewordersPageRoutingModule } from './neworders-routing.module';

import { NewordersPage } from './neworders.page';
import { ViewmoreComponent } from '../viewmore/viewmore.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewordersPageRoutingModule
  ],
  declarations: [NewordersPage,ViewmoreComponent]
})
export class NewordersPageModule {}
