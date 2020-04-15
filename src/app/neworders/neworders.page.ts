import { Component, OnInit } from '@angular/core';
import { ViewmoreComponent } from '../viewmore/viewmore.component';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { HTTP } from '@ionic-native/http/ngx';
import { Subscription } from 'rxjs';
import { AdminService } from '../auth.service';

@Component({
  selector: 'app-neworders',
  templateUrl: './neworders.page.html',
  styleUrls: ['./neworders.page.scss'],
})
export class NewordersPage implements OnInit {

  constructor(public modalController: ModalController, private http: HTTP, private data: AdminService, private alertController: AlertController, private toastController: ToastController) {}

  ngOnInit() {
    this.getAuthDetails();
    this.getNewOrders();
  }

  token: any;
  user_id: any;
  getAuthDetails() {
    this.token = this.data.getToken();
    this.user_id = this.data.getUserid();
  }
  
  newOrders: any;
  getNewOrders(){
    this.http.get(environment.apiurl + `api/get-del-approved-orders`, {}, {authtoken : this.token}).then((data) => {
      this.newOrders = JSON.parse(data.data);
      for(let i = 0; i < this.newOrders.length; i++){
        this.newOrders[i].order_address = JSON.parse(this.newOrders[i].order_address);
        this.newOrders[i].order_summary = JSON.parse(this.newOrders[i].order_summary);
      }
    })
  }

  async viewmore(order){
    const modal = await this.modalController.create({
      component: ViewmoreComponent,
      componentProps: {
        'order': order
      }
    });

    // modal.onDidDismiss()
    //   .then((data) => {
    //     this.getNewOrders();
    // });
    return await modal.present();
  }

  async acceptNewOrder(id){
    const alert = await this.alertController.create({
      header: 'Confirm!?',
      message: "Accept Order? This can't be undone!",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {}
        }, {
          text: 'Okay',
          handler: () => {
            this.http.post(environment.apiurl + `api/del-confirm-order`, 
            {order_id: id, delivery_boy_id: this.user_id}, 
            {authtoken : this.token})
            .then((data) => {
              if(data.data === 'true'){
                this.myToast("Accepted Order!");
                this.getNewOrders();
              }
              else{
                this.myToast("Some error occurred!");
              }
            })
          }
        }
      ]
    });

    await alert.present();
  }

  async myToast(message){
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
