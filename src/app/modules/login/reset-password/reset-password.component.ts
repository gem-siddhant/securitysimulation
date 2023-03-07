import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm:FormGroup;
  password = '';
  Passwordmetcriteria = false;
  showPassword = false;
  passwordStrengthClasses = {
    weak: true,
    medium: false,
    strong: false
  };
  criteria = [
    { name: 'Minimum length of 8 characters', met: false },
    { name: 'At least one uppercase letter', met: false },
    { name: 'At least one lowercase letter', met: false },
    { name: 'At least one number', met: false }
  ];
  constructor(private formBuilder: FormBuilder,
    private router:Router,
    private toastr:ToastrService,
    private _login:LoginService) { 
      this.resetForm = this.formBuilder.group({})
    }

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group(
      {
      password:['',Validators.required],
      confirmpass:['',this.confirmPasswordValidator],
  },)
  }
  updateCriteria(password: string): void {
    this.criteria[0].met = password.length >= 8;
    this.criteria[1].met = /[A-Z]/.test(password);
    this.criteria[2].met = /[a-z]/.test(password);
    this.criteria[3].met = /\d/.test(password);
    if(this.criteria[0].met == true &&
      this.criteria[1].met == true &&
      this.criteria[2].met == true &&
      this.criteria[3].met == true)
      {
        this.Passwordmetcriteria = true;
        console.log(this.Passwordmetcriteria)
      }
      else{
        this.Passwordmetcriteria = false;
      }
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  
  isConfirmPasswordValid(): boolean {
    return this.resetForm.value.password === this.resetForm.value.confirmpass;
  }


  confirmPasswordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.root.get('password');
    if (password && control.value !== password.value) {
      return { confirmpass: true };
    }
    return null;
  }

}
