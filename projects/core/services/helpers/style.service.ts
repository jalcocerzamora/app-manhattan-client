import { Injectable } from '@angular/core';

interface Styles {
  name: string;
  href: string;
}

export const StyleStore: Styles[] = [
  { name: 'leaflet', href: '/node_modules/leaflet/dist/leaflet.css' },
];

@Injectable({
  providedIn: 'root'
})
export class StyleService {
  private styles: any = {};
  constructor() {
    StyleStore.forEach((style: any) => {
      this.styles[style.name] = {
        loaded: false,
        href: style.href
      };
    });
  }
  load(...styles: string[]) {
    const promises: any[] = [];
    styles.forEach((style) => promises.push(this.loadStyles(style)));
    return Promise.all(promises);
  }
  loadStyles(name: string) {
    return new Promise((resolve, reject) => {
      // resolve if already loaded
      if (this.styles[name].loaded) {
        resolve({ style: name, loaded: true, status: 'Already Loaded' });
      } else {
        // load style
        const STYLE_TAG = document.createElement('link');
        STYLE_TAG.rel = 'stylesheet';
        STYLE_TAG.type = 'text/css';
        STYLE_TAG.href = this.styles[name].href;
        STYLE_TAG.onload = () => {
          this.styles[name].loaded = true;
          console.log(`${name} Loaded.`);
          resolve({ style: name, loaded: true, status: 'Loaded' });
        };
        STYLE_TAG.onerror = (error: any) => resolve({ style: name, loaded: false, status: 'Loaded' });
        document.getElementsByTagName('head')[0].appendChild(STYLE_TAG);
      }
    });
  }
}
