import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ViewmoreAcceptedComponent } from '../viewmore-accepted/viewmore-accepted.component';

@Component({
  selector: 'app-acceptedorders',
  templateUrl: './acceptedorders.page.html',
  styleUrls: ['./acceptedorders.page.scss'],
})
export class AcceptedordersPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  async viewmore(){
    const modal = await this.modalController.create({
      component: ViewmoreAcceptedComponent
    });
    return await modal.present();
  }

}
