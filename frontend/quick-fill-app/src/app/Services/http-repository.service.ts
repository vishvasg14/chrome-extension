import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL } from './constant';

@Injectable({
  providedIn: 'root'
})
export class HttpRepositoryService {

  constructor(private httpClient: HttpClient) { }
  
   /**
   * Generic post method
   */

  
   post(url: string, data: any, options: any): Observable<any> {
    return this.httpClient.post<any>(url, data, options);
  }

  /**
   * Generic put method
   */
  put(url: string, data: any, options: any): Observable<any> {
    return this.httpClient.put<any>(url, data, options);
  }

  /**
   * Generic delete method
   */
  delete(url: string, options: any): Observable<any> {
    return this.httpClient.delete<any>(url, options);
  }

  /**
   * Get request
   */
  get(url: string, options: any): Observable<any> {
    return this.httpClient.get<any>(url, options);
  }

  registration(value: any) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let options = {
      headers: headers,
    };

    let json =  {
      'firstName': value.firstName,
      'lastName': value.lastName,
      'personalEmail': value.email,
      'password': value.password
    }
   
    return this.post(URL.REGISTRATION, json, options);
  }

  login(value: any) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let options = {
      headers: headers,
    };

    let json =  {
      'personalEmail': value.email,
      'password': value.password
    }

    return this.post(URL.LOGIN, json, options);
  }
}

