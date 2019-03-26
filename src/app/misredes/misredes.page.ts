import { Component, OnInit } from '@angular/core';
import { RedesService } from '../../app/api/red/redes.service';
import { LoadingController, Refresher } from '@ionic/angular';
@Component({
  selector: 'app-misredes',
  templateUrl: './misredes.page.html',
  styleUrls: ['./misredes.page.scss'],
})
export class MisredesPage implements OnInit {
  redesUser: any;
  constructor(public redesServices: RedesService,
    private loadingCtrl: LoadingController) { 
  }

  ngOnInit() {
    this.getMyredes();
  }

 async getMyredes(){
     const loading = await this.loadingCtrl.create();
     loading.present();
     this.redesServices.getRedesUser(1)
       .then(data => {
         loading.dismiss();
         this.redesUser = data;
       });
   }
  doRefresh(event) {
    this.redesServices.getRedesUser(1)
      .then(data => {
        event.target.complete();
        this.redesUser = data;
      });
  }

  loadData(event) {
    this.redesServices.getRedesUser(1)
      .then(data => {
         event.target.complete();
        this.redesUser = this.redesUser.concat(data);
      });
  
  }

}
