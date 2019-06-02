import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Perfil de usuario',
      url: '/perfil',
      icon: 'person'
    },
    {
      title: 'Buscar redes',
      url: '/search-wifi',
      icon: 'search'
    },
    {
      title: 'Estadística',
      url: '/estadistica',
      icon: 'stats'
    },
    {
     title: 'Cerrar Sesión',
      url: '/bienvenido',
      icon: 'power'
    },
  ];

  showSplash = true;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      setTimeout(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    }, 100);
    });
  }
}
