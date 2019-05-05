import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Facebook } from '@ionic-native/facebook/ngx';
import { HttpClient} from '@angular/common/http';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UserService } from '../../app/api/user/user.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.page.html',
  styleUrls: ['./bienvenido.page.scss'],
})
export class BienvenidoPage {
  user:any ={};
  userdata:string;
  constructor(public navCtrl: NavController, 
              private fb: Facebook, 
              private http: HttpClient,
              public menuCtrl: MenuController,
              private storage: Storage,
              public userService: UserService,
              public toastController: ToastController,){}
  IrLoguear() {
      this.navCtrl.navigateForward(`Login`);
  } 
  async mensajeToast(mensaje: any) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }   
  IrPrincipal() {
    this.navCtrl.navigateForward(`principal`);
  }
  loginFb(){
    this.fb.login(['public_profile', 'email'])
    .then(res => {
      if (res.status==='connected'){
        this.user.img = 'https://graph.facebook.com/' + res.authResponse.userID +'/picture?type=normal';
      this.getData(res.authResponse.accessToken);
    }else{
        alert('error al conectar');
      } 
        console.log('Logueado a Facebook!', res)
      })
      .catch(error => {
        console.error(error);
      });
    }
    getData(access_token:string){
      let url ='https://graph.facebook.com/me?fields=id,name,first_name,last_name,email&access_token=' + access_token;
      this.http.get(url).subscribe(data => {
        this.userdata = JSON.stringify(data);
        let dataUser:any;
        dataUser = { 'nombre': data['first_name'], 'apellido': data['last_name'], 'f_nacimiento': '2019/01/01', 'email': data['email'], 'user': data['first_name'], 'imagen': this.user.img, 'passsword': data['id']};
        console.log(dataUser);
        this.userService.addUser(dataUser)
          .then(resp => {
            this.storage.set('user', resp['user']);
            this.storage.set('id', resp['userId']);
            this.navCtrl.navigateForward(`buscarredes`); 
            this.mensajeToast("Login correcto");
          }, (err) => {
              this.mensajeToast(err.error.message);
          });
          console.log(data);
      });
    }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  ngOnInit() {
    this.storage.remove('id');
    this.storage.remove('user');
  }
}
