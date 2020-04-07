import { Component, OnInit } from '@angular/core';
import { ModalController, MenuController } from '@ionic/angular';
import { ViewmoreAcceptedComponent } from '../viewmore-accepted/viewmore-accepted.component';

@Component({
  selector: 'app-acceptedorders',
  templateUrl: './acceptedorders.page.html',
  styleUrls: ['./acceptedorders.page.scss'],
})
export class AcceptedordersPage implements OnInit {

  constructor(public modalController: ModalController,public menuCtrl: MenuController) { }

  ngOnInit() {
    this.menuCtrl.enable(true);
  }

  async viewmore(){
    const modal = await this.modalController.create({
      component: ViewmoreAcceptedComponent
    });
    return await modal.present();
  }

}
