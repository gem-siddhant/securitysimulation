import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ThrottlingConstants } from '@azure/msal-common/dist/utils/Constants';
import { ToastrService } from 'ngx-toastr';
import { AddCampaignService } from 'src/app/modules/main/service/add-campaign.service';
import { CampaignConfirmComponent } from 'src/app/shared/campaign-confirm/campaign-confirm.component';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { CsvmessageComponent } from 'src/app/shared/csvmessage/csvmessage.component';
import { SamplecsvComponent } from 'src/app/shared/samplecsv/samplecsv.component';
import { json } from 'stream/consumers';
import { FormdataService } from '../service/formdata.service';
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
  imgfile:File;
  mode: ProgressSpinnerMode = 'indeterminate';
  color: ThemePalette = 'primary';
  file: File = this.test;
 // manager:any = "true";
  options:boolean=true;
  attachment:boolean=true;
  changeTriggered=false;
  text:any;
  vare:any;
  res : any = [];
  csvcheck : boolean= true;
  manager:any = localStorage.getItem('Manager');
  message:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<SendcampaignComponent>,
  private _addCampaign:AddCampaignService,
  private dialog:MatDialog,private router:Router,
  private formBuilder: FormBuilder,
  private sanitized: DomSanitizer,
  private shared: FormdataService,
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
    this.res=[]
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
    console.log(this.res.length)  
  }  
 
  }
  samplecsv()
  {
    let dataDialog = {title:"CSV file not Provided"};
    const dialogRef = this.dialog.open(SamplecsvComponent, {
      width: '650px',
      height: '330px',
      data: dataDialog
    });
  }

  sendnow(){
    this.message = this.shared.getMessage()
    this.imgfile = this.shared.getfile()
    if(this.csvcheck === false && this.res.length==0) 
    {
      let dataDialog = { title: 'Campaign Scheduled Successfully!' };
      const dialogRef = this.dialog.open(CsvmessageComponent, {
        width: '400px',
        height:'430px',
        data:dataDialog 
      });
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
    if(this.phisingForm.value.radio==true)
    {
      this.res=[]
    }
    if (this.res.length)
    {
      this.phisingForm.value.radio=false
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
    console.log(localStorage.getItem('name'))
    console.log(localStorage.getItem('file'))
    this.submitted = true;
    if(this.phisingForm.invalid)
    return;
    // if(localStorage.getItem('name')=="" || localStorage.getItem('templateDescription') == "" || localStorage.getItem('templateHeading') == ""  || localStorage.getItem('emailSignature')=="")
    // {
    //   this.toastr.error("please EDIT the Fields")
    //   return;
    // }
    // if(localStorage.getItem('email1') == "")
    // {
    //   this.toastr.error("please provide email id")
    //   return
    // }
    // if(localStorage.getItem('password') == "")
    // {
    //   this.toastr.error("please provide password")
    //   return
    // }
  
    const formData :any= new FormData();
    let reqBody={
      'name': this.message.name,
      'templateDescription': this.message.templateDescription,
      'templateAmount':this.message.templateAmount,
      'templateNo':this.message.templateNo,
      'templateRewardType':this.message.templateRewardType,
      'templateHeading':this.message.templateHeading,
      'createdBy':this.message.createdBy,
      'sendToReporters' : this.phisingForm.value.radio,
      'addNote': this.message.addNote,
      'emailSignature': this.message.emailSignature,
      'sendAttachment':this.message.sendAttachment,
      'attachmentName':this.message.attachmentName,
      'fileContent':this.message.fileContent,
      'victimEmails':this.res,
      'senderCredentials':JSON.parse(localStorage.getItem("users") || "[]"),
    }
    console.log(this.phisingForm.value.tzone)
    let con = JSON.stringify(reqBody);
    formData.append("details",con);
    formData.append('file',this.imgfile)
    if(this.manager=='true')
    {
    const localfile = "../../../../assets/pdf/fallbackcsv.csv"
    var local = new File(["foo"], localfile, {
      type: "file/csv"
    });
      // if(this.file!=null && this.file.size==0)
      // {
      //   this.toastr.error("empty csv can not be uploaded");
       
      // }
      // if(this.phisingForm.value.radio==true){
        
      //   formData.append("file",local);
      // }
      // else{
      //   formData.append("file",this.file)
      // }
    }
    // else
    // {
    //   if(this.file.size == 0)
    //   {

    //     this.toastr.error("empty csv can not be uploaded");
    //   }
    //   else{
    //   formData.append("file",this.file);
    //   }
    // }

    let dataDialog = { title: 'Are you sure you want to send campaign now?' };
    const dialogRef = this.dialog.open(CampaignConfirmComponent, {
      width: '513px',
      data: dataDialog
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      console.log(result)



    if(result==true)
    {
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
  }); }

  onClose() {
    this.dialogRef.close();
  }  
}
