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

  getRedes(data: any) {
    return new Promise((resolve, reject) => {
      const url = `${this.apiUrl}/redes/publicas`;
      this.http.post(url, data, this.httpOptions)
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }
  getRedesUser(id:any) {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + '/redes/user/'+id)
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
  updateEstadoRed(id:number, data:any, ) {
    return new Promise((resolve, reject) => {
      const url = `${this.apiUrl}/redes/${id}`;
      this.http.put(url, data, this.httpOptions)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
