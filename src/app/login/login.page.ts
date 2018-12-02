import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertOptions } from '@ionic/core';

//@IonicPage()
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {

  formulariosesion:FormGroup;

  constructor(
    private alertCtrl: AlertController,
    private fb: FormBuilder
  ) {
    this.buildForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  saveData(){
    console.log(this.formulariosesion.value);
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
     * @description Asignamos a la propiedad "formularioUsuario" los campos que se van a controlar de la vista
     */
    this.formulariosesion = this.fb.group({
      usuario:['',[Validators.required,Validators.maxLength(30)]],
      contraseña:['',[Validators.required,Validators.minLength(5),Validators.maxLength(12)]],
    });
  }
  
}