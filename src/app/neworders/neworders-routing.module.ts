import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewordersPage } from './neworders.page';
import { ViewmoreComponent } from '../viewmore/viewmore.component';

const routes: Routes = [
  {
    path: '',
    component: NewordersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],  
  entryComponents: [
    ViewmoreComponent
  ]
})
export class NewordersPageRoutingModule {}
