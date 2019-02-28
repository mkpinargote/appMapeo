import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage  {
  //image: string = null;
  image: SafeResourceUrl;
  myphoto:any;

  constructor(public actionSheetController: ActionSheetController, private camera: Camera, public navCtrl: NavController, private domSanitizer: DomSanitizer) {}

  async ActionsPhoto() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [{
        text: 'Eliminar foto actual',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Tomar foto',
        icon: 'camera',
        handler: () => {
          this.takephoto();
          //console.log('Camera Clicked');
        }
      }, {
        text: 'Elegir de galeria',
        icon: 'images',
        handler: () => {
          this.getimage();
         // console.log('Gallery Clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          //console.log('Cancel clicked');
        }
      },{
        text: 'Aceptar',
        icon: 'save',
        role: 'guardar',
        handler: () => {
          this.getimage();
        }
      }]
    });
    await actionSheet.present();
  }


  takephoto(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType. DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.myphoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
   }

   getimage(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType. DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:false
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.myphoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
   }
  }


// async takePhoto(){
//   const { Camera } = Plugins;
//    const result = await Camera.getPhoto({
//      quality: 75,
//      allowEditing: true,
//      source: CameraSource.Camera,
//      resultType: CameraResultType.Base64
//  });
//  this.image = this.domSanitizer.bypassSecurityTrustResourceUrl (result && result.base64Data,
//  );

// }
// }






// async takePhoto(){
//   const { Camera } = Plugins;
//   const result = await Camera.getPhoto({
//     quality: 75,
//     allowEditing: true,
//     source: CameraSource.Camera,
//     resultType: CameraResultType.Base64
// });
// this.image = this.domSanitizer.bypassSecurityTrustResourceUrl (result && result.base64Data,
// );

// }
  

// showAdd(){
//   console.log("Hola");
// }
