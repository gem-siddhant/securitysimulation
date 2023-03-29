import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { MainService } from '../../service/main.service';

@Component({
  selector: 'app-appraisal-login',
  templateUrl: './appraisal-login.component.html',
  styleUrls: ['./appraisal-login.component.css']
})
export class AppraisalLoginComponent implements OnInit {

  email: string;
  ipAddress: string;
  id: string;
  loginForm: FormGroup;
  loginsso: boolean;

  constructor(private route: ActivatedRoute,
    private commonService: CommonService,
    private http: HttpClient,
    private router: Router,
    private _mainService: MainService,
    private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({});
    this.ipAddress = '';
    this.email = '';
    this.id = '';
    this.loginsso = false;
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userid: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.route.queryParams.subscribe(
      params => {
        this.email = params['v1'];
        this.id = params['v2'];
      }
    )
    this.http.get<{ ip: string }>('https://jsonip.com')
      .subscribe(data => {
        this.ipAddress = data.ip
        this.sendData(this.email, this.ipAddress, this.id);
      })

  }

  recorduserdetailsviaSIGNIN(): void {
    this.loginsso = false;
    this.commonService.setClickBoolean(this.loginsso)
    if (this.loginForm.value.userid == '') {
      this.loginForm.value.userid = 'NA'
    }
    let reqbody = {
      'v1': this.email,
      'v2': this.id,
      "v3": this.commonService.encrypt(this.loginForm.value.userid),
    }
    this._mainService.sendrecordeddetails(reqbody).subscribe(async (data: any) => {
      if (data) {

      }
    }, (err) => {
      if (err.status == 200) {
        this.router.navigate(['/main/appraisal-portal/dashboard'])
      }
    })
  }

  recorduserdetailsviaSSO(): void {
    this.loginsso = true
    this.commonService.setClickBoolean(this.loginsso)
    if (this.loginForm.value.userid == '') {
      this.loginForm.value.userid = 'NA'
    }
    let reqbody = {
      'v1': this.email,
      'v2': this.id,
      "v3": this.commonService.encrypt(this.loginForm.value.userid),
    }
    this._mainService.sendrecordeddetails(reqbody).subscribe(async (data: any) => {

      if (data) {

      }
    }, (err) => {
      if (err.status == 200) {
        this.router.navigate(['/main/mis-apprasialportal-dashboard'])
      }
    })
  }

  sendData(emailID: string, ip: string, id: string): void {
    let obj = {
      'v1': emailID,
      'v2': id,
      'v3': this.commonService.encrypt(ip),
    }
    this._mainService.sendUserDetails(obj).subscribe((data: any) => {
      if (data) {

      }
    })
  }

}
