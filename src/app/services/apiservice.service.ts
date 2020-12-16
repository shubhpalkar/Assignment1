import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  // headers = new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*');
  headers = new HttpHeaders().set('content-type', 'application/json');
  baseurl: string;
  regid: any;
  constructor(private http: HttpClient) {
    this.baseurl = "http://universities.hipolabs.com/"
    // this.baseurl = "https://date.nager.at/api/v2/publicholidays/2020/US"
  }

  setDataPost(url: any, params: any) {
    this.http.post<any>(this.baseurl + url, params, { headers: this.headers }).toPromise().then(data => {
      this.regid = data['id'];
      if (this.regid) {
        localStorage.setItem('token', data['token']);
      }
    });
    return new Promise((resolve) => {
      if (this.regid) {
        resolve(this.regid);
      }
    });
  }

  //Calling Post API

  fetchDataPost(url: any, params: any) {
    return this.http.post<any>(this.baseurl + url, params, { headers: this.headers });
  }
  
  //Calling Get API

  fetchDataGet(url: any) {
  //  fetchDataGet() {
    return this.http.get(this.baseurl + url, { headers: this.headers });
    // return this.http.get(this.baseurl, { headers: this.headers });
  }
}
