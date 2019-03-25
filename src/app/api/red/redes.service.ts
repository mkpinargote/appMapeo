import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class RedesService {
   httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  apiUrl = 'https://agile-scrubland-87518.herokuapp.com/api/v01';
  constructor(public http: HttpClient) { }

  getRedes() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/redes').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  getRedesUser(id:any) {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + '/user/red/'+id)
      .subscribe(data => {
        resolve(data);
      }, (err) => {
        reject(err);
      });
    });
  }
  addRed(data:any) {
    return new Promise((resolve, reject) => {
      const url = `${this.apiUrl}/redes`;
      this.http.post(url, data, this.httpOptions)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
