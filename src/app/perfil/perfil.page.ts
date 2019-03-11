import { Component, OnInit, ViewChild, ElementRef, Directive, HostListener, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { ActionSheetController } from '@ionic/angular';
import { NgIf } from '@angular/common';
import { NgControl } from "@angular/forms";
import { FormControl, FormGroup, FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {
    SampleGroup: FormGroup;
    image: SafeResourceUrl;
    myphoto:any;
    mostrark:boolean=true;
    name:string;
    is_edit : boolean = true;
 
   constructor(public navCtrl: NavController, 
    public fb: FormBuilder,
    private camera: Camera,
    public actionSheetController: ActionSheetController,) {
     // this.BuildForm();
    //}
  
    // BuildForm() {
    //   this.SampleGroup = this.fb.group({
    //     'name': ['',Validators.required],
    //     });
    // }
  
    // Disable() {
    //   this.SampleGroup.disable();
    //   this.SampleGroup.updateValueAndValidity();
    // }
  
    // Enable() {
    //   this.SampleGroup.enable();
    //   this.SampleGroup.updateValueAndValidity();
    }

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
        }]
      });
      await actionSheet.present();
    }
  
    takephoto(){
      debugger
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType. DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        saveToPhotoAlbum:true,
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
  
     getimage(){
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType. DATA_URL,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        saveToPhotoAlbum:true
      }
      
      this.camera.getPicture(options).then((imageData) => {
       // imageData is either a base64 encoded string or a file URI
       // If it's base64 (DATA_URL):
       this.image = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {
       // Handle error
      });
     }
  

     isDisabled(){
     // return this.is_edit;
     this.is_edit = false;
    }

    // mostrar(){
    //   this.mostrark= false;
    // }


    
  }