import { Component, OnInit } from '@angular/core';
import { ViewmoreComponent } from '../viewmore/viewmore.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-neworders',
  templateUrl: './neworders.page.html',
  styleUrls: ['./neworders.page.scss'],
})
export class NewordersPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  async viewmore(){
    const modal = await this.modalController.create({
      component: ViewmoreComponent
    });
    return await modal.present();
  }

}
