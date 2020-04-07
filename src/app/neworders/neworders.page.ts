import { Component, OnInit } from '@angular/core';
import { ViewmoreComponent } from '../viewmore/viewmore.component';
import { ModalController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-neworders',
  templateUrl: './neworders.page.html',
  styleUrls: ['./neworders.page.scss'],
})
export class NewordersPage implements OnInit {

  constructor(public modalController: ModalController,public menuCtrl: MenuController) { }

  ngOnInit() {
    this.menuCtrl.enable(true);
  }

  async viewmore(){
    const modal = await this.modalController.create({
      component: ViewmoreComponent
    });
    return await modal.present();
  }

}
