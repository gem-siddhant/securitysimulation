import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SchedulelaterComponent } from '../schedulelater/schedulelater.component';
import { SendcampaignComponent } from '../sendcampaign/sendcampaign.component';

@Component({
  selector: 'app-customtemplate',
  templateUrl: './customtemplate.component.html',
  styleUrls: ['./customtemplate.component.css']
})
export class CustomtemplateComponent implements OnInit {
  loginForm:FormGroup;
  temp:boolean=false;
  imgupload:boolean=false;
  constructor( private toastr:ToastrService,
    private dialog:MatDialog,
    private formBuilder: FormBuilder)
    {
      this.loginForm = this.formBuilder.group({});
    }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      campname:['',Validators.required],
      subject:['',Validators.required],
      emailsign:['',Validators.required],
      senderemail:['',Validators.required],
      sendtemp:[''],
      emaildesc:[''],
      emailnote:['']
    });
  }
  url = "../../../../assets/images/add_pictures.svg"

  onselectfile1(e:any)
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
      this.imgupload = true
      }
      if (e.target.files[0].size < 2000000) 
      {/* checking size here - 2MB */
      this.imgupload = true
    }
    }
    else
    {
      this.toastr.error("Not an image")
    }
    }
  }


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
    this.imgupload = true;
  }
    if (e.target.files[0].size < 2000000) 
    {/* checking size here - 2MB */
    this.imgupload = true }
  }
  else
  {
    this.toastr.error("Please upload right img")
  }
  }
}
schedulelater()
{
  const dialogRef = this.dialog.open(SchedulelaterComponent, {
    width: '770px',
    height: '330px',
  }); 
  
}
sendnow()
{
  const dialogRef = this.dialog.open(SendcampaignComponent, {
    width: '523px',
    height: '330px',
});
}

preview()
{
  
}

}
