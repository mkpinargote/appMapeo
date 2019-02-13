import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertOptions } from '@ionic/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  implements OnInit {
  formularioLogin:FormGroup;
  constructor(public actionSheetController: ActionSheetController,  public navCtrl1: NavController,
              public alertCtrl: AlertController,
              private alertController: AlertController,
              private fb: FormBuilder,
              public navCtrl: NavController,
              public menuCtrl: MenuController
  ) {
    this.buildForm();
  }
  saveData(){
    const alert = this.alertCtrl.create(<AlertOptions>{
      title : "Datos enviados",
      message : "Los registros fueron enviados correctamente",
      buttons : ['Ok']}
      );

    alert.finally()
    this.buildForm();
  }
  buildForm() {
    /**
     * @description Asignamos a la propiedad "formularioLogin" los campos que se van a controlar de la vista
     */
    this.formularioLogin = this.fb.group({
      usuario:['',[Validators.required,Validators.maxLength(10)]],
      password:['',[Validators.required,Validators.minLength(6),Validators.maxLength(12)]]
      });
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  ngOnInit() {
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Acción',
      buttons: [{
        text: 'Guardar',
        role: 'guardar',
        icon: 'save',
        handler: () => {
          console.log('save clicked');
        }
      },  {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  goToSearchWifi() {
    this.navCtrl.navigateForward(`search-wifi`);
  }
}
  