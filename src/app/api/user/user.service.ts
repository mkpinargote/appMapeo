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
  getUser(id: any) {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + '/users/' + id)
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }
  addUser(data: any) {
    return new Promise((resolve, reject) => {
      const url = `${this.apiUrl}/users`;
      this.http.post(url, data, this.httpOptions)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  updateUser(id: number, data: any, ) {
    return new Promise((resolve, reject) => {
      const url = `${this.apiUrl}/users/${id}`;
      this.http.put(url, data, this.httpOptions)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  updateNickname(id: number, data: any, ) {
    return new Promise((resolve, reject) => {
      const url = `${this.apiUrl}/users/change/${id}`;
      this.http.put(url, data, this.httpOptions)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  filterNickname(data: any) {
    return new Promise((resolve, reject) => {
      const url = `${this.apiUrl}/users/filter`;
      this.http.post(url, data, this.httpOptions)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  loginUser(data: any, ) {
    return new Promise((resolve, reject) => {
      const url = `${this.apiUrl}/users/login`;
      this.http.post(url, data, this.httpOptions)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
