import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../app/api/user/user.service';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { ToastController, MenuController} from '@ionic/angular';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})

export class PrincipalPage implements OnInit {
  formularioUser: FormGroup;
  user: any;
  msgdata: any;
  constructor(public actionSheetController: ActionSheetController, public navCtrl: NavController,
    public alertCtrl: AlertController,
    private fb: FormBuilder,
    public userService: UserService,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    public toastController: ToastController,
    public menuCtrl: MenuController,
    
  ) {
    this.user = { 'imagen': 'https://agile-scrubland-87518.herokuapp.com/imagenes/usuario.png' };
    this.buildForm();
  }
  saveData() {
    this.buildForm();
    this.saveUsuario();
  }
  buildForm() {
    /**
     * @description Asignamos a la propiedad "formularioUser" los campos que se van a controlar de la vista
     */
    this.formularioUser = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(20)]],
      imagen: ['', [Validators.maxLength(20)]],
      f_nacimiento: ['', [Validators.required, Validators.maxLength(20)]],
      apellido: ['', [Validators.required, Validators.maxLength(20)]],
      correo: ['', [Validators.required, Validators.email]],
      usuario: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      password1: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      acepto: ['', [Validators.required]],
    });
  }
  ngOnInit() {
    this.storage.get('id').then((val) => {
      if(val != null){
        this.goSearchWifi();
      } 
    });
  }
  goSearchWifi() {
    this.navCtrl.navigateForward(`search-wifi`);
  }
  async saveUsuario() {
    const loading = await this.loadingCtrl.create({
      message: 'Registrando...',
    });
    await loading.present();
    this.userService.addUser(this.user)
      .then(data => {
        this.storage.set('user', data['user']);
        this.storage.set('id', data['userId']);
        this.goSearchWifi();
        this.navCtrl.navigateForward(`buscarredes`);
        loading.dismiss();
      }, (err) => {
        loading.dismiss();
          this.mensajeToast(err.error['message']);
      });
  }
  async mensajeToast(mensaje: any) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  } 
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
}


