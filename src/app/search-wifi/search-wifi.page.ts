import { Component, OnInit } from '@angular/core';
import { Hotspot, HotspotNetwork } from '@ionic-native/hotspot';
@Component({
  selector: 'app-search-wifi',
  templateUrl: './search-wifi.page.html',
  styleUrls: ['./search-wifi.page.scss'],
})
export class SearchWifiPage implements OnInit {
  data: any;
  constructor(private hotspot: Hotspot) { }
  ngOnInit() {
    this.hotspot.scanWifi().then((networks: Array<HotspotNetwork>) => {
      debugger
      console.log(networks);
      this.data = networks;
  
    });
  }
  ionViewDidLoad() {
    



  }
}
