import { THIS_EXPR, ThrowStmt } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientOnboardService } from '../Services/client-onboard.service';
import * as XLSX from 'xlsx';
import { OnboardapiserviceService } from '../Services/onboardapiservice.service';

@Component({
  selector: 'app-rate-card',
  templateUrl: './rate-card.component.html',
  styleUrls: ['./rate-card.component.css']
})
export class RateCardComponent implements OnInit {
  onboardform:FormGroup;
  passworddetails : any;
  officedetails: any;
  arrayBuffer: any;
  file: File;
  listofemp:any;
  res : any = [];
  vare:any;
  constructor(private formBuilder: FormBuilder, 
    private shared: ClientOnboardService,
    private router:Router,
    private _onboardclient: OnboardapiserviceService) { 
    this.onboardform = this.formBuilder.group({})
  }

  ngOnInit(): void {
    this.onboardform = this.formBuilder.group({
      planname:[''],
      plancost:[''],
      startdate:[''],
      enddate:[''],
      sendinviteenow:[''||false]
  });
  }

  onFileChange(ev:any) {
    this.file = ev.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(this.file)
    fileReader.onload = (ev:any)=>
    {
      console.log(ev);
      let binaryData = ev.target.result;
      let workbook = XLSX.read(binaryData, {type:'binary'})
      workbook.SheetNames.forEach(sheet =>
        {
          const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
          console.log(data)
          this.vare = (data)
        })
    }
  }

  // Upload() {
  //   this.res=[]
  //   let fileReader = new FileReader();
  //   fileReader.onload = e => {
  //     this.arrayBuffer = fileReader.result;
  //     var data = new Uint8Array(this.arrayBuffer);
  //     var arr = new Array();
  //     for (var i = 0; i != data.length; ++i)
  //       arr[i] = String.fromCharCode(data[i]);
  //       this.res.push(arr[i]);
  //     var bstr = arr.join("");
  //     var workbook = XLSX.read(bstr, { type: "binary" });
  //     var first_sheet_name = workbook.SheetNames[0];
  //     var worksheet = workbook.Sheets[first_sheet_name];
  //     console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
  //   };
  //   fileReader.readAsArrayBuffer(this.file);
  //   console.log(this.vare)
  // }

  routeto(){
    this.passworddetails = this.shared.getpassword()
    this.officedetails = this.shared.getoffdetails()
    const formData :any= new FormData();
    let req = {
      'username':this.officedetails.username,
      'password':this.passworddetails.password,
      'firstName':this.officedetails.firstname,
      'lastName':this.officedetails.lastname,
      'designation':this.officedetails.designation,
      'managerId':this.officedetails.managerId,
      'department':this.officedetails.department,
      'contactNumber':'123456789',
      'clientId':0,
      'planId':0,
      'onboardEmployees':this.onboardform.value.sendinviteenow,
      'employeeDetails': this.vare
    }
    this._onboardclient.submitclientdetails(req).subscribe((data)=>
    {
      if(data)
      {
        console.log("client onboar done")
      }
    })
    this.router.navigate(['client-onboard/Onboarded'])
  }
}
