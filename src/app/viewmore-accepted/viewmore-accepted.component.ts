import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import { AdminService } from '../auth.service';
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-viewmore-accepted',
  templateUrl: './viewmore-accepted.component.html',
  styleUrls: ['./viewmore-accepted.component.scss'],
})
export class ViewmoreAcceptedComponent implements OnInit {

  @Input('order') order: any;

  orderDetails: any;
  constructor(public modalCtrl: ModalController, private navParams: NavParams, private http: HTTP, private data: AdminService, private toastController: ToastController) {
    this.orderDetails = navParams.get('order');
  }
  ngOnInit() {
    this.getAuthDetails();
    this.getItems();
    this.deliveryCharge = this.orderDetails.order_del_charge;
  }

  token: any;
  user_id: any;
  getAuthDetails() {
    this.token = this.data.getToken();
    this.user_id = this.data.getUserid();
  }
  deliveryCharge: any = 0;
  price: any = 0;
  totalPrice: any = this.deliveryCharge + this.price;
  items: any;
  getItems() {
    this.price = 0;
    this.http.get(environment.apiurl + `api/get-del-order-items?id=${this.orderDetails.order_id}`, {}, {authtoken : this.token}).then((data) => {
      this.items = JSON.parse(data.data);
      for(let i = 0; i < this.items.length; i++){
        this.price += this.items[i].item_cost;
      }
      this.totalPrice = this.deliveryCharge + this.price;;
    })
  }

  updateForm(form: NgForm){
    if(form.valid){
      let obj = {};
      obj['items'] = this.items;
      obj['total_price'] = this.price;
      obj['deliver_charge'] = this.deliveryCharge;
      obj['order_id'] = this.orderDetails.order_id;
      this.http.post(environment.apiurl + `api/del-update-order`, 
      obj, 
      {authtoken : this.token})
      .then((data) => {
        if(data.data === 'true'){
          this.myToast("Updated Order!");
          this.dismiss();
        }
        else{
          this.myToast("Some error occurred!");
        }
      })
    }
  }

  changeItemCost(id, ev){
    for(let i = 0; i < this.items.length; i++){
      if(this.items[i].item_id === id){
        this.items[i].item_cost = Number(ev.target.value);
      }
    }
    this.calculateTotal();
  }

  calculateTotal(){
    this.price = 0;
    for(let i = 0; i < this.items.length; i++){
      this.price += this.items[i].item_cost;
    }
    this.totalPrice = Number(this.price) + Number(this.deliveryCharge);
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  async myToast(message){
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
