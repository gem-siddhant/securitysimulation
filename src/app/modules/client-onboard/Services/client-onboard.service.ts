import { Injectable } from '@angular/core';
import { AnyTxtRecord } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class ClientOnboardService {
  passdata: any;
  officialdetails : any;
  parameters : any;
  constructor() { 
  }

// passing password data 
  setpassword(data:any)
  {
    this.passdata = data
  }
  getpassword()
  {
    return this.passdata
  }

// passing officialdetails data 
  setoffdetails(data:any)
  {
    this.officialdetails=data
  }
  getoffdetails()
  {
    return this.officialdetails
  }

//passing query params data
setemail(data:any)
{
  this.parameters=data
}
getemail()
{
  return this.parameters
}

}
