import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HTTP } from '@ionic-native/http/ngx';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private token: any;
  private userName: any;
  private userId: any;
  private isAdmin: any;
  private showLoader: boolean;
  userDetails$: Object;
  private tokenTimer: any;
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();
  private loaderListener = new Subject<boolean>();

  constructor(private http: HTTP, private router: Router, private toastController: ToastController) { }

  async myToast(message: string) {
    const toast = await this.toastController.create({
      message: `${message}`,
      duration: 2000
    });
    toast.present();
  }

  getToken(){
    return this.token;
  }

  getIsAuth(){
    return this.isAuthenticated;
  }

  getName(){
    return this.userName;
  }
  getUserid(){
    return this.userId;
  }
  getLoaderStatus(){
    return this.loaderListener.asObservable();
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  getUser(loginDetails){
    this.loaderListener.next(true);
    let headers = {
      'Content-Type': 'application/json'
    };
    this.http.post(environment.apiurl + 'api/delivery-boy-login', loginDetails,headers)
    .then(data => {
      this.userDetails$ = JSON.parse(data.data);
      if(this.userDetails$){
        this.token = this.userDetails$[Object.keys(this.userDetails$)[0]];;
      }
      else{
        this.token = false;
      }

      if(this.token){
        const expiresInDuration = this.userDetails$[Object.keys(this.userDetails$)[2]];
        // console.log(expiresInDuration);
        this.setAuthTimer(expiresInDuration);
        this.userName = this.userDetails$[Object.keys(this.userDetails$)[1]];
        this.userId = this.userDetails$[Object.keys(this.userDetails$)[3]];
        this.isAdmin = this.userDetails$[Object.keys(this.userDetails$)[4]];
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        this.saveAuthData(this.token, expirationDate, this.userName, this.userId, this.isAdmin);
        this.router.navigate(['/neworders']);
        this.autoAuthUser();
        this.loaderListener.next(false);
        // console.log('Logged in!');
        this.myToast("Logged in!");
      }
      else if(this.token === false){
       this.showLoader = false;
       this.authStatusListener.next(false);
       this.showLoader = false;
       this.loaderListener.next(false);
      //  console.log('Logging in failed..!');
      this.myToast("Some error happened!");
      }
    })
  }

  autoAuthUser(){
    const authInformation = this.getAuthData();
    if(!authInformation){
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if(expiresIn > 0){
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userName = authInformation.usnername;
      this.userId = authInformation.userid;
      this.isAdmin = authInformation.isadmin;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  private setAuthTimer(duration: number){
    // console.log("Timer:" + duration);
    this.tokenTimer = setTimeout(() => {
      this.getLogout();
    }, duration * 1000);
  }

  getLogout(){
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/login']);
    this.myToast("Logged out!")
  }

  private saveAuthData(token: string, expirationDate: Date, userName, userid, isadmin){
    localStorage.setItem("token", token);
    localStorage.setItem("username", userName);
    localStorage.setItem("userid", userid);
    localStorage.setItem("isadmin", isadmin);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }

  private clearAuthData(){
    localStorage.removeItem("token");
    localStorage.removeItem('expiration');
    localStorage.removeItem('username');
    localStorage.removeItem('userid');
    localStorage.removeItem('isadmin');
  }

  private getAuthData(){
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem("expiration");
    const username = localStorage.getItem('username');
    const userid = localStorage.getItem('userid');
    const isadmin = localStorage.getItem('isadmin');
    if(!token || !expirationDate || !username || !userid){
      return;
    }
    return{
      token: token,
      expirationDate: new Date(expirationDate),
      usnername: username,
      userid: userid,
      isadmin: isadmin
    }
  }
}
