import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddCampaignService } from 'src/app/modules/main/service/add-campaign.service';
import { json } from 'stream/consumers';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import * as fs from 'fs' 
import { CsvmessageComponent } from '../csvmessage/csvmessage.component';

@Component({
  selector: 'app-sendcampaign',
  templateUrl: './sendcampaign.component.html',
  styleUrls: ['./sendcampaign.component.css']
})
export class SendcampaignComponent implements OnInit {
  StoreData:boolean=true;
  DialogData:any;
  credsForm:FormGroup;
  phisingForm: FormGroup;
  api_hit:boolean=true;
  submitted = false;
  test: any = null;
  value = 50;
  mode: ProgressSpinnerMode = 'indeterminate';
  color: ThemePalette = 'primary';
  file: File = this.test;
  options:boolean=true;
  attachment:boolean=true;
  changeTriggered=false;
  text:any;
  vare:any;
  res : any = [];
  csvcheck : boolean= true;
  manager:any = localStorage.getItem('Manager');
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<SendcampaignComponent>,
  private _addCampaign:AddCampaignService,
  private dialog:MatDialog,private router:Router,
  private formBuilder: FormBuilder,
  private sanitized: DomSanitizer,
  private toastr:ToastrService) {
    this.phisingForm = this.formBuilder.group({});
    this.credsForm = this.formBuilder.group({}); 
   }

  ngOnInit(): void {
    this.phisingForm = this.formBuilder.group(
      {
        attachmentFile:[''],
        radio:[''||'false'],
      }
    );
  }
  onChange(event: any) {
    this.changeTriggered = true;
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(this.file);
    reader.onload = () => {
    this.text = reader.result;
    var lines = this.text.split('\n');
   
    for(var i=0;i<lines.length;i++)
    {
      var curr = lines[i].split('\n');
      var curr = lines[i].replace('\r','');
      this.res.push(curr);
    } 
    for(var j=0;j<this.res.length;j++)
    {
      var format = /[ `!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;
      if(this.res[j] !="" && this.res[j].includes('@')==true && (this.res[j].split('@').length - 1)==1 && format.test(this.res[j])==false && (this.res[j].endsWith("geminisolutions.com") || this.res[j].endsWith("Geminisolutions.com") )  )
      {
       
      }
      else{
        let dataDialog = { title: 'Campaign Scheduled Successfully!' };
        const dialogRef = this.dialog.open(CsvmessageComponent, {
          width: '400px',
          height:'430px',
          data:dataDialog 
          
        });
        this.res = []
        this.csvcheck = false
      }
    }
    this.vare = JSON.stringify(this.res);
  }  
 
  }

  sendnow(){
    if(this.csvcheck === false)
    {
      return
    }
    if(this.manager!='true' && this.res.length==0)
    {
      let dataDialog = {title:"CSV file not Provided"};
        const dialogRef = this.dialog.open(ConfirmationModalComponent, {
          width: '400px',
          height:'400px',
          data: dataDialog
        });
        return
    }
    if (this.res.length)
    {
      let ed = Math.ceil(this.res.length/1500)
      let sender = JSON.parse(localStorage.getItem("users") || "[]");
      let differe = ed - sender.length
      
      if(differe > 0)
      {
        let dataDialog = { title: 'Please provide ' + differe + ' more email id and Password' };
        const dialogRef = this.dialog.open(ConfirmationModalComponent, {
          width: '400px',
          height:'400px',
          data: dataDialog
        });
        dialogRef.afterClosed().subscribe(()=>{
          this.router.navigate(['main/add-campaign']);
        })
        return
      }
      
    }
    this.submitted = true;
    if(this.phisingForm.invalid)
    return;
    if(localStorage.getItem('name')=="" || localStorage.getItem('templateDescription') == "" || localStorage.getItem('templateHeading') == ""  || localStorage.getItem('emailSignature')=="")
    {
      this.toastr.error("please EDIT the Fields")
      return;
    }
    if(localStorage.getItem('email1') == "")
    {
      this.toastr.error("please provide email id")
      return
    }  
    const formData :any= new FormData();
    let reqBody={
      'name': localStorage.getItem('name'),
      'templateDescription':localStorage.getItem('templateDescription'),
      'templateAmount':localStorage.getItem('templateAmount'),
      'templateNo':localStorage.getItem('templateNo'),
      'templateRewardType':localStorage.getItem('templateRewardType'),
      'templateHeading':localStorage.getItem('templateHeading'),
      'createdBy':localStorage.getItem('email'),
      'sendToReporters' : this.phisingForm.value.radio,
      'addNote' : localStorage.getItem('addNote'),
      'emailSignature': localStorage.getItem('emailSignature'),
      'sendAttachment': localStorage.getItem('sendAttachment'),
      'attachmentName': localStorage.getItem('attachmentName'),
      'fileContent':localStorage.getItem('fileContent'),
      'victimEmails':this.res,
      'senderCredentials':JSON.parse(localStorage.getItem("users") || "[]"),
    }
    let con = JSON.stringify(reqBody);
    formData.append("details",con);
    if(this.manager=='true')
    {
    const localfile = "../../../../assets/pdf/fallbackcsv.csv"
    var local = new File(["foo"], localfile, {
      type: "file/csv"
    });
    }
    this.StoreData=false;
    this._addCampaign.createCampaign(formData).subscribe((data)=>{
      this.dialogRef.close()
      if(data){
        this.StoreData=true;
        let dataDialog = { title: 'Campaign Sent Successfully!' };
        const dialogRef = this.dialog.open(ConfirmationModalComponent, {
          width: '400px',
          height:'400px',
          data: dataDialog
        });
        dialogRef.afterClosed().subscribe(()=>{
          this.router.navigate(['main/dashboard']);
        })
      }
    },(err)=>{
      this.StoreData=true;
       if(err.status==200){
         console.log('err',err);
       let dataDialog = { title: 'Campaign Sent Successfully!' };
        const dialogRef = this.dialog.open(ConfirmationModalComponent, {
          width: '400px',
          height:'400px',
          data: dataDialog
        });
        dialogRef.afterClosed().subscribe(()=>{
          this.router.navigate(['main/dashboard']);
        });
      }
      else{
        this.toastr.error("Error in adding campaign.");
      }
  });
 
  }
}
