import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-viewmore-accepted',
  templateUrl: './viewmore-accepted.component.html',
  styleUrls: ['./viewmore-accepted.component.scss'],
})
export class ViewmoreAcceptedComponent implements OnInit {

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }


}
