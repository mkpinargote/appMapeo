import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AlertOptions } from '@ionic/core';
//import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})

export class PrincipalPage implements OnInit {
  formularioUser:FormGroup;
  constructor(public actionSheetController: ActionSheetController,  public navCtrl: NavController,
    public alertCtrl: AlertController,
    private alertController: AlertController,
    private fb: FormBuilder
  ) {
    this.buildForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
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
     * @description Asignamos a la propiedad "formularioUser" los campos que se van a controlar de la vista
     */
    this.formularioUser = this.fb.group({
      nombre:['',[Validators.required,Validators.maxLength(30)]],
      apellido:['',[Validators.required,Validators.maxLength(30)]],
      correo:['',[Validators.required,Validators.email]],
      usuario:['',[Validators.required,Validators.maxLength(10)]],
      password:['',[Validators.required,Validators.minLength(6),Validators.maxLength(12)]],
      password1:['',[Validators.required,Validators.minLength(6),Validators.maxLength(12)]],
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

  }


