import { Component, OnInit } from '@angular/core';

import { Platform, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { environment } from 'src/environments/environment';
import { HTTP } from '@ionic-native/http/ngx';
import { NgForm } from '@angular/forms';
import { AdminService } from './auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private data: AdminService, private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  userIsAuthenticated = false;
  auth: boolean;
  userName: any;
  userId: any;
  isAdmin: any;
  private authListenerSubs: Subscription;

  ngOnInit() {
    this.getAuthDetails();
  }

  getAuthDetails() {
    // get auth details 
    this.data.autoAuthUser();
    this.userIsAuthenticated = this.data.getIsAuth();
    this.authListenerSubs = this.data.getAuthStatusListener().subscribe(result => {
      this.userIsAuthenticated = result;
    });
    this.userName = this.data.getName();
    this.userId = this.data.getUserid();
    this.auth = this.data.getIsAuth();
    if(this.auth === false){
      this.router.navigate(['/login']);
    }
    else{
      this.router.navigate(['/neworders']);
    }
    // get auth details 
  }

  logout(){
    this.data.getLogout();
  }
}
