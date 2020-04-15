import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { ModalController, ToastController } from '@ionic/angular';
=======
import { ModalController, MenuController } from '@ionic/angular';
>>>>>>> f5d036d2b35330c5753f7c7aa35bdab621356ead
import { ViewmoreAcceptedComponent } from '../viewmore-accepted/viewmore-accepted.component';
import { environment } from 'src/environments/environment';
import { HTTP } from '@ionic-native/http/ngx';
import { AdminService } from '../auth.service';

@Component({
  selector: 'app-acceptedorders',
  templateUrl: './acceptedorders.page.html',
  styleUrls: ['./acceptedorders.page.scss'],
})
export class AcceptedordersPage implements OnInit {

  constructor(public modalController: ModalController, private http: HTTP, private data: AdminService, private toastController: ToastController) { }

  ngOnInit() {
    this.getAuthDetails();
    this.getacceptedOrders();
  }

  token: any;
  user_id: any;
  getAuthDetails() {
    this.token = this.data.getToken();
    this.user_id = this.data.getUserid();
  }

  acceptedOrders: any;
  getacceptedOrders(){
    this.http.get(environment.apiurl + `api/get-del-accepted-orders?id=${this.user_id}`, {}, {authtoken : this.token}).then((data) => {
      this.acceptedOrders = JSON.parse(data.data);
      for(let i = 0; i < this.acceptedOrders.length; i++){
        this.acceptedOrders[i].order_address = JSON.parse(this.acceptedOrders[i].order_address);
        this.acceptedOrders[i].order_summary = JSON.parse(this.acceptedOrders[i].order_summary);
      }
    })
  }

  async viewmore(order){
    const modal = await this.modalController.create({
      component: ViewmoreAcceptedComponent,
      componentProps: {
        'order': order
      }
    });
    return await modal.present();
  }

  async myToast(message){
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
