import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcceptedordersPage } from './acceptedorders.page';
import { ViewmoreAcceptedComponent } from '../viewmore-accepted/viewmore-accepted.component';

const routes: Routes = [
  {
    path: '',
    component: AcceptedordersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],  entryComponents: [
    ViewmoreAcceptedComponent
  ]
})
export class AcceptedordersPageRoutingModule {}
