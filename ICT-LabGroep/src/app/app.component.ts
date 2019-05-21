import { Component, ViewChild } from '@angular/core';

import { Platform,MenuController,NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  rootPage: any;

  public appMenu = [
    {title: 'Home', url: '/home', icon: 'list'},
    {title: 'Product', url: '/upload', icon: 'add'},
    {title: 'Search Product', url: '/search', icon: 'add'},
    /**{title: 'Member', url: '/user', icon: 'contact'}**/

  ]
  @ViewChild(NavController) nav: NavController;

  constructor(
      private platform: Platform,
      private splashScreen: SplashScreen,
      private auth: AuthService,
      private statusBar: StatusBar,
      private menu: MenuController,
      private router: Router,
      private navCtrl: NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
    });

    this.auth.afAuth.authState
        .subscribe(
            user => {
              if (user) {
                this.rootPage = this.navCtrl.navigateRoot('/home');
              } else {
                this.rootPage = this.navCtrl.navigateRoot('/login');
              }
            },
            () => {
              this.rootPage = this.navCtrl.navigateRoot('/login');
            }
        );
  }
  login() {
    this.menu.close();
    this.auth.signOut();
    this.navCtrl.navigateRoot('/login')
  }
  logout() {
    this.menu.close();
    this.auth.signOut();
    this.navCtrl.navigateRoot('/home')

  }
}
