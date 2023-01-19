import { ThisReceiver, ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { InfomodalComponent } from 'src/app/shared/infomodal/infomodal.component';
import { SchedulelaterComponent } from '../schedulelater/schedulelater.component';
import { SendcampaignComponent } from '../sendcampaign/sendcampaign.component';
import { FormdataService } from '../service/formdata.service';

@Component({
  selector: 'app-customtemplate',
  templateUrl: './customtemplate.component.html',
  styleUrls: ['./customtemplate.component.css']
})
export class CustomtemplateComponent implements OnInit {
  loginForm:FormGroup;
  temp:boolean=false;
  file: File;
  imgupload:boolean=false;
  selectedOption: any = [];
  wrongimageuploaded :boolean = false
  nameofimg :string =''
  constructor( private toastr:ToastrService,
    private dialog:MatDialog,
    private shared: FormdataService,
    private formBuilder: FormBuilder)
    {
      this.loginForm = this.formBuilder.group({});
    }

  ngOnInit(): void {
    let emailpass = new FormArray([])
    this.loginForm = this.formBuilder.group({
      campname:['',Validators.required],
      subject:['',Validators.required],
      emailsign:['',Validators.required],
      senderEmail:['',Validators.required],
      sendtemp:[''],
      emaildesc:[''],
      emailnote:[''],
      allemails : emailpass
    });
    this.addAddress();
  }

  addAddress()
  {
    const emailpassItem = new FormGroup({
      senderEmail: new FormControl('', Validators.required),
    });
    (<FormArray>this.loginForm.get('allemails')).push(emailpassItem);
  }

  getcontrols()
  {
    return (this.loginForm.get('allemails') as FormArray).controls;
  }

  cleartext()
  {
    this.loginForm.value.allemails.onreset();
  }

  onRemoveQuestion(index: number)
  {
    const emailpassItem = new FormGroup({
      senderEmail: new FormControl('', Validators.email),
      // senderPassword: new FormControl('', Validators.required),
    });
    (<FormArray>this.loginForm.get('allemails')).removeAt(index);
    this.selectedOption.splice(index, 1);
  }
  url = "../../../../assets/images/add_pictures.svg"

  onselectfile1(e:any)
  {
    this.imgupload = false
    this.wrongimageuploaded = false
    if(e.target.files)
    {
      this.file = e.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
        this.url = event.target.result
        this.nameofimg = e.target.files[0].name
      }
      if (e.target.files[0].type == 'image/jpeg' || 
      e.target.files[0].type == 'image/png' || 
      e.target.files[0].type =='image/jpg') 
      {
      if (e.target.files[0].size < 300 * 300) 
      {/* Checking height * width*/ 
      this.imgupload = true
      
      }
      else{
        let dataDialog = { title: 'Image uploaded is not in correct format' };
        const dialogRef = this.dialog.open(InfomodalComponent, {
          width: '400px',
          height:'330px',
          data:dataDialog 
        });
     this.imgupload = true
     this.wrongimageuploaded = true
     return 
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
    return 
  }
  this.imgupload = false
  }
  else
  {
    this.toastr.error("Please upload right img")
  }
  }
}
schedulelater()
{
  if(this.wrongimageuploaded==true)
  {
    let dataDialog = { title: 'Image uploaded is not in correct format' };
    const dialogRef = this.dialog.open(InfomodalComponent, {
      width: '400px',
      height:'330px',
      data:dataDialog 
    });
    return
  }
  for(let i=0;i<this.loginForm.value.allemails.length;i++)
  {
    let email = this.loginForm.value.allemails[i];
    if(email['senderEmail'].includes(['@']) && email['senderEmail'].includes(['.']))
    {
    }
    else{
      this.toastr.error("not a valid email to send campaigns")
      return
    }
  }
  let email = this.loginForm.value.allemails[0];
  // if(this.loginForm.value.name == "" || this.loginForm.value.footer == "")
  // {
  //   this.toastr.error("Please EDIT The Fields")
  //   return;
  // }
  if(email['senderEmail']=="" )
  {
    
    this.toastr.error("Please Provide email")
    return;
  }
  let req = {
      'name': this.loginForm.value.campname,
      'templateDescription':this.loginForm.value.emaildesc,
      // 'templateAmount':this.loginForm.value.reward_amount.toString(),
      'templateNo':'6',
      // 'templateRewardType':this.loginForm.value.reward_type,
      'templateHeading':this.loginForm.value.subject,
      'createdBy':localStorage.getItem('email'),
      // 'sendToReporters' : this.loginForm.value.sendtemp,
      'addNote' : this.loginForm.value.emailnote,
      'emailSignature': this.loginForm.value.emailsign,
  }
  localStorage.setItem("users", JSON.stringify(this.loginForm.value.allemails));
  const dialogRef = this.dialog.open(SchedulelaterComponent, {
    width: '770px',
    height: '330px',
  }); 
  let file1 = this.file
  this.shared.setMessage(req)
  this.shared.setfile(file1)
}
sendnow()
{
  if(this.wrongimageuploaded==true)
  {
    let dataDialog = { title: 'Image uploaded is not in correct format' };
    const dialogRef = this.dialog.open(InfomodalComponent, {
      width: '400px',
      height:'330px',
      data:dataDialog 
    });
    return
  }
  for(let i=0;i<this.loginForm.value.allemails.length;i++)
  {
    let email = this.loginForm.value.allemails[i];
    console.log(email['senderEmail'])
    if(email['senderEmail'].includes(['@']) && email['senderEmail'].includes(['.']))
    {
    }
    else{
      this.toastr.error("not a valid email to send campaigns")
      return
    }
  }
  // let email = this.loginForm.value.allemails[0];
  // console.log(email['email'])
  // if(this.loginForm.value.name == "" || this.loginForm.value.subject == "" || this.loginForm.value.desc == ""|| this.loginForm.value.footer == "")
  // {
  //   this.toastr.error("Please EDIT The Fields")
  //   return;
  // }
  // if(email['senderEmail']=="" )
  // {    
  //   this.toastr.error("Please Provide email")
  //   return;
  // }
  let req  = {
    'name': this.loginForm.value.campname,
    'templateDescription':this.loginForm.value.emaildesc,
    // 'templateAmount':this.loginForm.value.reward_amount.toString(),
    'templateNo':'6',
    // 'templateRewardType':this.loginForm.value.reward_type,
    'templateHeading':this.loginForm.value.subject,
    'createdBy':localStorage.getItem('email'),
    // 'sendToReporters' : this.loginForm.value.sendtemp,
    'sendAttachment': 'false',
    'addNote' : this.loginForm.value.emailnote,
    'emailSignature': this.loginForm.value.emailsign,
  }
  localStorage.setItem("users", JSON.stringify(this.loginForm.value.allemails));
  const dialogRef = this.dialog.open(SendcampaignComponent, {
    width: '523px',
    height: '330px',
});
let file1 = this.file
this.shared.setMessage(req)
this.shared.setfile(file1)
}

preview()
{
  
}

}
