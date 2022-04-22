import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormGroupDirective,
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
  NgForm,
} from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MainService } from '../service/main.service';
import { ToastrService } from 'ngx-toastr';
import { MsalBroadcastService, MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-common';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { InteractionStatus, InteractionType, PopupRequest, RedirectRequest } from '@azure/msal-browser';
import { MatDialog } from '@angular/material/dialog';
import { ResponsiveService } from 'src/app/services/responsive.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //loginForm:FormGroup;
  isIframe = false;
  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();
  mobile: boolean = false;
  constructor(private formBuilder: FormBuilder,
    private _MainService:MainService,
    private _auth:AuthService,
    private router:Router,
    private _responsiveService: ResponsiveService,
    private _authUserService: AuthService,
    public dialog: MatDialog,
    private msalService:MsalService,@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private toastr: ToastrService) {
  //  this.loginForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;
    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
      });

    console.log('LOGIN COMPONENT');
    this.onResize();
    this._responsiveService.checkWidth();
    if (this._authUserService.checkLogin()) {
      this.router.navigate(['/main/dashboard']);
    }
    this._authUserService.setNotificationModalBoolean(true)
  }
  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }
  onResize() {
    this._responsiveService.getMobileStatus().subscribe(isMobile => {
      this.mobile = isMobile;
    });
  }
  loginWithMicrosoft2(){
    this.authService.loginPopup({...this.msalGuardConfig.authRequest} as PopupRequest).subscribe((response: AuthenticationResult)=>{
      if(response){
        this._authUserService.setToken(response.account?.username,response.accessToken).then(()=>{
          this.router.navigate(['/main/dashboard']);
        sessionStorage.clear();
        }).then(()=>{
          this._authUserService.getEmployeeDetailBehaviorSubject().subscribe(item => {
            if (item) {
              if (item.notifications && this._authUserService.getNotificationModalBoolean()) {
                this._authUserService.setNotificationModalBoolean(false);
              }
            }
          });
        })
      }
    })
  }
  loginWithMicrosoft(){
    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      if (this.msalGuardConfig.authRequest){
        this.authService.loginPopup({...this.msalGuardConfig.authRequest} as PopupRequest)
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
          });
        } else {
          this.authService.loginPopup()
            .subscribe((response: AuthenticationResult) => {
              this.authService.instance.setActiveAccount(response.account);
            });
      }
    } else {
      if (this.msalGuardConfig.authRequest){
        this.authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest);
      } else {
        this.authService.loginRedirect();
      }
    }


  }

    //this.loginForm = this.formBuilder.group({
     // id:['',Validators.required],
     // password:['',Validators.required]
   // if(localStorage.getItem('token')){
     // this.router.navigate(["/main/dashboard"]);
    //}
  //}
 // submit(){
   // if(this.loginForm.invalid)
    //return;
    //let obj={
     // "email":this.loginForm.value.id,
      //"password":this.loginForm.value.password
   // }
    //this._auth.loginMethod(obj).subscribe((data)=>{
     // if(data){
      //  console.log(data.data);
       /// console.log(data.message);
        ///localStorage.setItem('token',data.message);
        //localStorage.setItem('email',data.data.email);
        //this.router.navigate(["/main/dashboard"]);
     // }
    //},err=>{
     /// this.toastr.error("Error in loading data");
    ///})
  //}

}
