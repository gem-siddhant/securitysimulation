import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { ToastrService } from 'ngx-toastr';
import { count } from 'rxjs';
import { AddCampaignService } from 'src/app/modules/main/service/add-campaign.service';
import { Pipe, PipeTransform } from '@angular/core';
import { title } from 'process';
import { CsvmessageComponent } from 'src/app/shared/csvmessage/csvmessage.component';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { SamplecsvComponent } from 'src/app/shared/samplecsv/samplecsv.component';
import { CampaignConfirmComponent } from 'src/app/shared/campaign-confirm/campaign-confirm.component';
@Component({
  selector: 'app-schedulelater',
  templateUrl: './schedulelater.component.html',
  styleUrls: ['./schedulelater.component.css']
})


export class SchedulelaterComponent implements OnInit {
  StoreData:boolean=true;
  selected = 'None';
  DialogData:any;
  credsForm:FormGroup;
  phisingForm: FormGroup;
  api_hit:boolean=true;
  value = 50;
  mode: ProgressSpinnerMode = 'indeterminate';
  color: ThemePalette = 'primary';
  submitted = false;
  test: any = null;
  file: File = this.test;
  //manager:any = "true";
  victcsv : any = [] ;
  options:boolean=true;
  currentdate : any = new Date()
  maxDate: Date;
  attachment:boolean=true;
  manager:any = localStorage.getItem('Manager');
  changeTriggered=false;
  text:any;
  vare:any
  myFooList: any = ['Some Item', 'Item Second', 'Other In Row', 'What to write', 'Blah To Do'];
  res: any = [];
  csvcheck : boolean= true;
  constructor( public dialogRef: MatDialogRef<SchedulelaterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _addCampaign:AddCampaignService,
    private dialog:MatDialog,private router:Router,
    private formBuilder: FormBuilder,
    private sanitized: DomSanitizer,
    private toastr:ToastrService ){
      this.phisingForm = this.formBuilder.group({});
      this.credsForm = this.formBuilder.group({});
    }

   
  ngOnInit(): void {
    this.phisingForm = this.formBuilder.group(
      {
        date:['',Validators.required],
        time:[''],
        timezone:[''],
        attachmentFile:[''],
        radio:[''||'false'],
      }
    );
    const currentYear = new Date().getFullYear();
    // this.currentdate = new Date(currentYear)
    this.maxDate = new Date(currentYear + 1,3,31);
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
        // this.dialogRef.close();
        this.res = []
        this.csvcheck = false
      }
    }
    if(this.file == null)
    {
      let dataDialog = {title:"Empty CSV Cannot be Uploaded"};
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
  schedulelater(){
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
    if((this.manager!='true') && this.res.length==0)
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
    //this.phisingForm.value.date =  new Date((this.phisingForm.value.dat).utcOffset('+0000').format('YYYY-MM-DD HH:MM'))
    this.submitted = true;
    const scheduledate = moment(this.phisingForm.value.date).format("YYYY-MM-DD");
    const currentYear = moment().year();
    this.maxDate = new Date(currentYear + 1, 2);
    if(this.phisingForm.invalid)
    return;
    if(this.res.length==null)
    {
      this.toastr.error("Please Check your CSV first")
      console.log("wrong csv")
      return
    }
    if(localStorage.getItem('name')=="" || localStorage.getItem('templateDescription') == "" || localStorage.getItem('templateHeading') == "" || localStorage.getItem('emailSignature')=="" )
    {
      this.toastr.error("please EDIT the Fields")
      return;
    }
    if(localStorage.getItem('email1') == "")
    {
      this.toastr.error("please provide email id")
      return;
    }
    // if(localStorage.getItem('password') == "")
    // {
    //   this.toastr.error("please provide password")
    //   return;
    // }
    if (this.phisingForm.value.time== "")
    {
      this.toastr.error("Please Provide Time")
      return;
    }
    if (this.phisingForm.value.timezone== "")
    {
      this.toastr.error("Please Provide TimeZone")
      return;
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
     // 'email':localStorage.getItem('email1'),
      //'password':localStorage.getItem('password'),
      'sendToReporters' : this.phisingForm.value.radio,
      'addNote' : localStorage.getItem('addNote'),
      'emailSignature': localStorage.getItem('emailSignature'),
      'sendAttachment': localStorage.getItem('sendAttachment'),
      'attachmentName': localStorage.getItem('attachmentName'),
      'fileContent':localStorage.getItem('fileContent'),
      'scheduleDate':scheduledate,
      'scheduleTime':this.phisingForm.value.time,
      'scheduleTimeZone':this.phisingForm.value.timezone,
      'victimEmails':this.res,
      'senderCredentials':JSON.parse(localStorage.getItem("users") || "[]"),
    }
    console.log(this.phisingForm.value.tzone)
    let con = JSON.stringify(reqBody);
    formData.append("details",con);
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
        
      //   console.log(this.file.size)
      // }
    }
    // else
    // {
    //   if(this.file.size == 0)
    //   {

    //     this.toastr.error("empty csv can not be uploaded");
    //   }
    //   else{
    //   formData.append("file",this.text);
    //   }
    // }

    let dataDialog = { title: 'Are you sure you want to Schedule this campaign?' };
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
    this._addCampaign.schedulecampagin(formData).subscribe((data)=>{
      this.dialogRef.close()
      if(data){
        this.StoreData=true;
        let dataDialog = { title: 'Campaign Schedule Successfully!' };
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
         this.dialogRef.close()
       let dataDialog = { title: 'Campaign Scheduled Successfully!' };
        const dialogRef = this.dialog.open(ConfirmationModalComponent, {
          width: '400px',
          height:'400px',
          data: dataDialog
        });
        dialogRef.afterClosed().subscribe(()=>{
          this.router.navigate(['main/dashboard']);
        })
      }
      else{
        this.toastr.error("Error in adding campaign.");
      }
    });
  }
});
    
  }
  moment(dat: any) {
    throw new Error('Method not implemented.');
  }
  darkTheme: NgxMaterialTimepickerTheme = {
    container: {
        bodyBackgroundColor: '#66209D',
        buttonColor: '#fff'
    },
    dial: {
        dialBackgroundColor: '#66209D',
    },
    clockFace: {
        clockFaceBackgroundColor: '#fff',
        clockHandColor: '#312936;',
        clockFaceTimeInactiveColor: 'black'
    }
};

onClose() {
  this.dialogRef.close();
}  
}
