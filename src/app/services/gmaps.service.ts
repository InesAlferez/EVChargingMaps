import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GmapsService {

  constructor() { }

  loadingGoogleMaps(): Promise<any> {
    const win = window as any;
    const gModule = win.google;
    if (gModule && gModule.maps) {
      return Promise.resolve(gModule.maps);
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDZaBSwxq4Aguvl76DoA4B5SYMlX5s3yrM';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const gModule = win.google;
        if (gModule && gModule.maps) {
          resolve(gModule.maps);
        } else {
          reject('Google maps SDK not available');
        }
      };
    });

    
}}
