import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private isSideNavOpened: boolean;
  private isLoggedIn: boolean;
  private screenRouting: string;
  private navbarTitle: string;
  private key: string;
  private iv: string;
  private clickbutton: any;
  private ssologin: boolean;

  constructor() {
    this.isSideNavOpened = true;
    this.isLoggedIn = false;
    this.screenRouting = '';
    this.navbarTitle = '';
    this.key = "ID1xjvwDeGNRdbap++mGDw==";
    this.iv = "AgVhqbeyn4iz6lWs0+Oezw==";
  }

  getNavTitle(): string {
    return this.navbarTitle;
  }

  setNavTitle(val: string): void {
    this.navbarTitle = val;
  }

  getScreenRouting(): string {
    return this.screenRouting
  }

  setScreenRouting(val: string): void {
    this.screenRouting = val;
  }

  getSideNavOpened(): boolean {
    return this.isSideNavOpened;
  }

  setSideNavOpened(val: boolean): void {
    this.isSideNavOpened = val;
  }

  getLoginStatus(): boolean {
    return this.isLoggedIn;
  }

  setLoginStatus(val: boolean): void {
    this.isLoggedIn = val;
  }

  setbuttonclick(val: any) {
    this.clickbutton = val
  }
  getbuttonclick() {
    return this.clickbutton
  }
  encrypt(data: string): string {
    const keyHex = CryptoJS.enc.Base64.parse(this.key);
    const ivHex = CryptoJS.enc.Base64.parse(this.iv);
    const encrypted = CryptoJS.AES.encrypt(data, keyHex, {
      iv: ivHex,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return CryptoJS.enc.Base64url.stringify(encrypted.ciphertext);
  }

  decrypt(data: string): string {
    const keyHex = CryptoJS.enc.Base64.parse(this.key);
    const ivHex = CryptoJS.enc.Base64.parse(this.iv);
    const base64EncryptedText = data
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    let decrypted = CryptoJS.AES.decrypt(base64EncryptedText, keyHex, {
      iv: ivHex,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  setClickBoolean(sso: boolean) {
    this.ssologin = sso
  }
  getClickBoolean() {
    return this.ssologin
  }
}
