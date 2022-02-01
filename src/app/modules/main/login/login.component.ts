import { Component, OnInit } from '@angular/core';
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
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;

  constructor(private formBuilder: FormBuilder,
    private _MainService:MainService,
    private _auth:AuthService,
    private router:Router) {
    this.loginForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      id:['',Validators.required],
      password:['',Validators.required]
    });
  }
  submit(){
    if(this.loginForm.invalid)
    return;
    let obj={
      "email":this.loginForm.value.id,
      "password":this.loginForm.value.password
    }
    this._auth.loginMethod(obj).subscribe((data)=>{
      if(data){
        console.log(data.data);
        console.log(data.message);
        localStorage.setItem('token',data.message);
        localStorage.setItem('email',data.data.email);
        this.router.navigate(["/main/dashboard"]);
      }
    })
  }

}
