import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  public set(key : string, value : string) {
    localStorage.setItem(key, value);
  }
  public get(key : string) {
    return localStorage.getItem(key);
  }
  public deleteByKey(key : string) {
    localStorage.removeItem(key);
  }
  
  public deleteAll() {
    localStorage.clear();
  }
}
