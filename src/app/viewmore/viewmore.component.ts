import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-viewmore',
  templateUrl: './viewmore.component.html',
  styleUrls: ['./viewmore.component.scss'],
})
export class ViewmoreComponent implements OnInit {

  @Input('order') order: any;

  orderDetails: any;
  constructor(public modalCtrl: ModalController, private navParams: NavParams) {
    this.orderDetails = navParams.get('order');
  }

  ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
