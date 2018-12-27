import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.page.html',
  styleUrls: ['./bienvenido.page.scss'],
})
export class BienvenidoPage {

  constructor(public navCtrl: NavController){}
    
  IrLoguear() {
        this.navCtrl.navigateForward(`Login`);
  }    
  IrPrincipal() {
    this.navCtrl.navigateForward(`principal`);
  }
}
