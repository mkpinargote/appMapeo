import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  apiUrl = 'https://agile-scrubland-87518.herokuapp.com/api/v01';
  constructor(public http: HttpClient) { }

  uploadImagen (file:any){
    return new Promise((resolve, reject) => {
      debugger
      const url = `${this.apiUrl}/user/imagen/1`;
      let posData = new FormData();
      posData.append('file', file);
      this.http.post(url, posData, this.httpOptions)   
        .subscribe(res => {
          debugger
          resolve(res);
        }, (err) => {
          debugger
          reject(err);
        });
    });

  }


}
