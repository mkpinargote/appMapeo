import { Component, OnInit, ViewChild, ElementRef, Directive, HostListener, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { ActionSheetController } from '@ionic/angular';
import { NgIf } from '@angular/common';
import { NgControl } from "@angular/forms";
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})

export class PerfilPage {
  SampleGroup: FormGroup;
  image: SafeResourceUrl;
  myphoto: any;
  mostrark: boolean = true;
  name: string;
  is_edit: boolean = true;

  constructor(public navCtrl: NavController,
    public fb: FormBuilder,
    private camera: Camera,
    public actionSheetController: ActionSheetController, ) {
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
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: true,
      mediaType: this.camera.MediaType.PICTURE
    }
    debugger
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.myphoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }
  getimage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: true
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }
  isDisabled() {
    this.is_edit = false;
  }

}