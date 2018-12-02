import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
 
  constructor(public navCtrl: NavController){}
    
  IrLoguear() {
        this.navCtrl.navigateForward(`login`);
  }    
  IrPrincipal() {
    this.navCtrl.navigateForward(`principal`);
  }

  IrDetectar() {
    this.navCtrl.navigateForward(`detectar-redes`);
  }
}
