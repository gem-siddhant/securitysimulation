import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customtemplate',
  templateUrl: './customtemplate.component.html',
  styleUrls: ['./customtemplate.component.css']
})
export class CustomtemplateComponent implements OnInit {
  loginForm:FormGroup;
  temp:boolean=true;
  constructor( private toastr:ToastrService,
    private formBuilder: FormBuilder)
    {
      this.loginForm = this.formBuilder.group({});
    }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      campname:['',Validators.required],
      subject:['',Validators.required],
      emailsign:['',Validators.required],
      senderemail:['',],
      sendtemp:['']
    });
  }
  url = "../../../../assets/images/template1.png"
onselectfile(e:any)
{
  if(e.target.files)
  {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload=(event:any)=>{
      this.url = event.target.result
    }
    if (e.target.files[0].type == 'image/jpeg' || 
    e.target.files[0].type == 'image/png' || 
    e.target.files[0].type =='image/jpg') 
    {
    if (e.target.files[0].size > 300 * 300) 
    {/* Checking height * width*/ 
    this.toastr.error("Please upload right img");
    return;
  }
    if (e.target.files[0].size < 2000000) 
    {/* checking size here - 2MB */ }
  }
  else
  {
    this.toastr.error("Please upload right img")
  }
  }
}
}
