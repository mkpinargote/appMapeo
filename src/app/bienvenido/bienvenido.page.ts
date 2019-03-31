import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { HttpClient} from '@angular/common/http';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
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
              private storage: Storage,){}
    
  IrLoguear() {
        this.navCtrl.navigateForward(`Login`);
  }    
  IrPrincipal() {
    this.navCtrl.navigateForward(`principal`);
  }
  loginFb(){
    this.fb.login(['public_profile', 'email'])
    .then((res: FacebookLoginResponse) => {
      if (res.status==='connected'){
      this.user.img = 'https://graph.facebook.com/'+res.authResponse.userID+'/picture?type=square';
      this.getData(res.authResponse.accessToken);
    }else{
        alert('error al conectar');
      }  
        console.log('Logueado a Facebook!', res)
      })
      .catch(e => console.log('Error al concetar con Facebook', e));
    }
    getData(access_token:string){
      let url ='https://graph.facebook.com/me?fields=id,name,first_name,last_name,email&access_token=' + access_token;
      this.http.get(url).subscribe(data => {
        this.userdata = JSON.stringify(data);
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
