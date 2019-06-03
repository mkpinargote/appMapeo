import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Chart } from 'chart.js';
import { Hotspot, HotspotNetwork } from '@ionic-native/hotspot/ngx';
@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.page.html',
  styleUrls: ['./estadistica.page.scss'],
})

export class EstadisticaPage {

  interval: any;
  speedCanvas: any;
  lineChart: any;
  levelScan: any;
  SSIDInfo: any;
  BSSIDInfo: any;
  linkSpeedInfo: any;
  IPAddressInfo: any;
  frequencyScan: any;
  constructor(public navCtrl: NavController,
    private hotspot: Hotspot,
    public alertController: AlertController,) {
    this.startTimer();
  }

  async scanWifi() {
    this.hotspot.scanWifi().then((networks: Array<HotspotNetwork>) => {
      networks.forEach(element => {
        if (element.SSID == this.SSIDInfo) {
          this.frequencyScan = element.frequency;
          this.levelScan = element.level;
        }
      })
      this.graficaNivelSenal(this.levelScan);
      this.graficaLine(this.levelScan);
    });
  }
  async getInfoNetCurre() {
    this.hotspot.getConnectionInfo().then((data) => {
      this.SSIDInfo = data.SSID.substring(1, data.SSID.length - 1);
      this.IPAddressInfo = data.IPAddress.substring(1);;
      this.linkSpeedInfo = (parseFloat(data.linkSpeed) / 100) * 100;
      this.BSSIDInfo = data.BSSID;
      this.graficaVelocidad(this.linkSpeedInfo);
    })
  }

  startTimer() {
    this.interval = setInterval(function () {
      this.hotspot.scanWifi().then((networks: Array<HotspotNetwork>) => {
        networks.forEach(element => {
          if (element.SSID == this.SSIDInfo) {
            this.frequencyScan = element.frequency;
            this.levelScan = element.level;
          }
        })
        this.graficaNivelSenal(this.levelScan);
        this.updateGraficaLine(this.levelScan);
      });

    }.bind(this), 2000);
  }
  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
  graficaNivelSenal(senal: number) {
    var ctx = (<any>document.getElementById('canvas-chart1')).getContext('2d');
    var chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          label: "Nivel de senal",
          backgroundColor: [
            'rgba(70, 156, 118, 0.2)',
            'rgba(151, 215, 187  , 0.2)'
          ],
          hoverBackgroundColor: [
            "#469C76",
            "#97D7BB"
          ],
          data: [senal, - 100 - (senal)]
        }]
      }
    });
  }
  //Gráfica - velocidad de enlace 
  graficaVelocidad(velocidad: number) {
    var ctx = (<any>document.getElementById('canvas-chart')).getContext('2d');
    var chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          label: "Velocidad de enlace",
          backgroundColor: [
            'rgba(3, 138, 238, 0.2)',
            'rgba(146, 207, 252, 0.2)'
          ],
          hoverBackgroundColor: [
            "#038AEE",
            "#92CFFC"
          ],
          data: [velocidad, 100 - velocidad]
        }]
      }
    });
  }
  //actualizar el grafico de linea
  async updateGraficaLine(senal: number) {
    this.lineChart.data.labels.push(senal);
    this.lineChart.data.datasets[0].data.push(senal);
    this.lineChart.options.scales.xAxes[0].ticks.fontColor = 'white';
    this.lineChart.options.scales.yAxes[0].ticks.reverse = true;
    this.lineChart.update();
    //preguntamos si existen más de 15 label
    if (this.lineChart.data.labels.length >= 12) {
      this.lineChart.data.labels.shift();
      this.lineChart.data.datasets[0].data.shift(senal);
    }
  }
  //Grafica nivel de señal 
  async graficaLine(senal: number) {
    this.speedCanvas = (<any>document.getElementById('speedChart')).getContext('2d');
    Chart.defaults.global.defaultFontFamily = "Lato";
    Chart.defaults.global.defaultFontSize = 12;
    let speedData = {
      datasets: [{
        fill: true,
        label: "nivel señal",
        data: [senal],
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
      }],
      options: {
        tooltips: {
          enabled: false
        },
        legend: {
          display: false,
          position: 'bottom',
          labels: {
            fontColor: 'white'
          }
        }
      }
    };
    this.lineChart = new Chart(this.speedCanvas, {
      type: 'line',
      data: speedData,
    });
  }
  goSearchWifi() {
    this.navCtrl.navigateForward(`search-wifi`);
  }
  ngOnInit() {
    this.hotspot.isConnectedToInternetViaWifi().then((data) => {
      if (data == true) {
        this.getInfoNetCurre();
        this.scanWifi();
      } else {
        this.AlertNotConexion();
      }
    });
  }
  formateaValor(valor) {
    // si no es un número devuelve el valor, o lo convierte a número con 2 decimales
    return isNaN(valor) ? valor : parseFloat(valor).toFixed(1);
  }
  async AlertNotConexion() {
    const alert1 = await this.alertController.create({
      header: 'Conexión',
      message: 'Se requiere conexión a internet',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.goSearchWifi();
          }
        }
      ]
    });
    await alert1.present();
  }
}