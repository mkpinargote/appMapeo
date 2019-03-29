import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { UserService } from '../../app/api/user/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})

export class PerfilPage {
  SampleGroup: FormGroup;
  myphoto: any;
  mostrark: boolean = true;
  name: string;
  is_edit: boolean = true;
  imageURI: any;
  imageFileName: any;
  lastImage: string = null;
  constructor(public navCtrl: NavController,
    public fb: FormBuilder,
    private camera: Camera,
    public actionSheetController: ActionSheetController, 
    private webview: WebView,
    private transfer: FileTransfer,
    public toastController: ToastController,
    public loadingCtrl: LoadingController,
    public userService: UserService) {
  }
  async ActionsPhoto() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [{
        text: 'Eliminar foto actual',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
        }
      }, {
        text: 'Tomar foto',
        icon: 'camera',
        handler: () => {
          this.takephoto();
        }
      }, {
        text: 'Elegir de galeria',
        icon: 'images',
        handler: () => {
          this.getimage();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }
  takephoto() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: true,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
      targetWidth: 500,
      targetHeight: 500,
    };
    this.camera.getPicture(options).then((imageData) => {
      this.myphoto = imageData;
      this.uploadFile();
    }, (err) => {
      // Handle error
    });
  }
  getimage() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: true,
      targetWidth: 500,
      targetHeight: 500,
    }
    this.camera.getPicture(options).then((imageData) => {
      this.myphoto = imageData;
      this.uploadFile();
    }, (err) => {
      // Handle error
    });
  }
 
  isDisabled() {
    this.is_edit = false;
  }
 async uploadFile() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
    });
    await loading.present();
   var imagenBD = new Date().getTime() + ".jpg";
   const fileTransfer: FileTransferObject = this.transfer.create();
   let options: FileUploadOptions = {
     fileKey: 'file',
     fileName: imagenBD,
     chunkedMode: false,
     httpMethod: 'post',
     mimeType: 'image/jpeg',
     headers: {}
   }
   fileTransfer.upload(this.myphoto, encodeURI('https://agile-scrubland-87518.herokuapp.com/api/v01/user/imagen/1'), options)
     .then((data) => {
       this.imageFileName = "https://agile-scrubland-87518.herokuapp.com/imagenes/" + imagenBD;
       this.presentToast("Imagen actualizada");
       loading.dismiss();
     }, (err) => {
        console.log(err);
          loading.dismiss();
        this.presentToast(err);
      });
  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}