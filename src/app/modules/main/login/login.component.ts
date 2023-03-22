import { Component, HostBinding, Inject, OnInit } from '@angular/core';
import {light} from 'src/app/shared/themes/light-theme/lightcolor';
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
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ResponsiveService } from 'src/app/services/responsive.service';
import { AddCampaignService } from '../service/add-campaign.service';
import { CommonService } from 'src/app/services/common.service';
import { roles } from 'src/app/shared/Constants/constants';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isIframe = false;
  loginDisplay = false;
  loginForm:FormGroup;
  private readonly _destroying$ = new Subject<void>();
  mobile: boolean = false;
  status?: number;
  role : number = 0
  showPassword = false;
  constructor(private formBuilder: FormBuilder,
    private _addCampaign:AddCampaignService,
    private _MainService:MainService,
    private _auth:AuthService,
    private router:Router,
    private _responsiveService: ResponsiveService,
    private _authUserService: AuthService,
    public dialog: MatDialog,
    private msalService:MsalService,@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private toastr: ToastrService,
    private commonService : CommonService
    ) {

  }
  color:string='';

  ngOnInit(): void {
    this.commonService.setLoginStatus(false);
    this.color = light.button;
    console.log(this.color)
    this.isIframe = window !== window.parent && !window.opener;
    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
      });
        this.loginForm = this.formBuilder.group({
            id:[''],
            password:['']
          });
          if(localStorage.getItem('email')){
            this.router.navigate(["/main/Admindashboard"]);
          }
    console.log('LOGIN COMPONENT');
    this.onResize();
    this._responsiveService.checkWidth();
    
    // will be used to authorization control
    if (this._authUserService.checkLogin()) {
      this.router.navigate(['/main/dashboard-admin']);
    }
    this._authUserService.setNotificationModalBoolean(true)
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }
  onResize() {
    this._responsiveService.getMobileStatus().subscribe(isMobile => {
      this.mobile = isMobile;
    });
  }

  setRole()
  {
    if(localStorage.getItem('role')==roles.USER)
    {
      this.role = 3
    }
    else if(localStorage.getItem('role')==roles.ADMIN)
    {
      this.role = 2
    }
    else if(localStorage.getItem('role')==roles.SUPER_ADMIN)
    {
      this.role = 1
    }
  }

  loginWithMicrosoft2(){
    this.authService.loginPopup({...this.msalGuardConfig.authRequest} as PopupRequest).subscribe((response: AuthenticationResult)=>{
      if (response.tenantId == '') {
        prompt('Invalid')
        }
      if(response){
        console.log("res",response);
        this._authUserService.setToken(response.account?.username,response.accessToken).then(()=>{
        this.router.navigate(['/main/dashboard-admin']);
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
    },
    );
  }
  submit(){
    // this.router.navigate(["main/dashboard-admin"]);
      console.log("login form hit")
        if(this.loginForm.invalid)
        return;
        let obj={
          "email":this.loginForm.value.id,
          "password":this.loginForm.value.password
        }
        this._auth.loginMethod2(obj).subscribe((data)=>{
          if(data){
            let jwtToken = JSON.parse(window.atob(data.token.split(".")[1]));
            let role = JSON.parse(window.atob(data.token.split(".")[1]))
            let name = JSON.parse(window.atob(data.token.split(".")[1]))
            localStorage.setItem('name',jwtToken.name)
            localStorage.setItem('role',role.roles)
            localStorage.setItem('email',jwtToken.sub);
            localStorage.setItem('token',data.token);
            this.setRole()
            if(this.role==3)
            {
              this.router.navigate(["main/Employee"]);
            }
            else if(this.role==2){
              this.router.navigate(["main/Admin"]);
            }
            else{
              this.router.navigate(["main/Superadmin"]);
            }
          }
        },(err)=>{
          if(err.status!=200)
          {
            this.toastr.error("Invalid Credentials",undefined,
            {
              positionClass: 'toast-top-center'
            }
            );
          }
        })
      }
}