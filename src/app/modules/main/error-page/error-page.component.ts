import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';
import { FormdataService } from '../service/formdata.service';
import { MainService } from '../service/main.service';
@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  email:any;
  ipAddress: any;
  id:any;
  loginForm:FormGroup;
  loginsso:boolean;

  constructor(private route:ActivatedRoute,
    private shared: FormdataService,
    private toastr:ToastrService,
    private http:HttpClient,
    private router:Router,
    private _mainService:MainService,private formBuilder: FormBuilder,
    private commonService : CommonService) 
  {
    this.loginForm = this.formBuilder.group({});
   }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.email =  params['v1'];
        this.id =  params['v2'];
      }
    )
    this.http.get<{ip:string}>('https://jsonip.com')
    .subscribe( data => {
      this.ipAddress = data.ip
      this.sendData(this.email,this.commonService.encrypt(this.ipAddress),this.id);
    })

  }
  sendData(emailID:any,ip:any,id:any){
    let obj={
      'v1':emailID,
      'v2':id,
      'v3':ip
    }
    this._mainService.sendUserDetails(obj).subscribe((data:any)=>{
      if(data){
        
      }
    })
  }

}
