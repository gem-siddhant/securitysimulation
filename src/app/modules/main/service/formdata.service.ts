import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormdataService {
  file: File;
  formd: any;
  ssologin: boolean;
  constructor() { }

  setMessage(data:any)
  {
    this.formd = data;
  }
  getMessage()
  {
    return this.formd
  }
 setfile(imagefile:File)
 {
  this.file = imagefile
 }
 getfile()
 {
  return this.file
 }
 setclick(sso:boolean)
 {
  this.ssologin=sso
 }
 getclick()
 {
  return this.ssologin
 }
}
