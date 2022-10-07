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
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { Pipe, PipeTransform } from '@angular/core';
import { title } from 'process';
import { CsvmessageComponent } from '../csvmessage/csvmessage.component';
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
      if(this.res[j] !="" || this.res[j].includes('@') || (this.res[j].split('@').length - 1)==1 )
      {
       
      }
      else{
        let dataDialog = { title: 'Campaign Scheduled Successfully!' };
        const dialogRef = this.dialog.open(CsvmessageComponent, {
          width: '400px',
          height:'430px',
          data:dataDialog 
          
        });
        dialogRef.afterClosed().subscribe(()=>{
          this.router.navigate(['main/add-campaign']);
        })
        this.csvcheck = false
      }
    }
 

    // for(var k=0;k<res.length;k++)
    // {
    //   if (res[k].includes('@'))
    //   {
       
    //   }
    //   else{
    //     let dataDialog = { title: 'Campaign Schedule Successfully!' };
    //     const dialogRef = this.dialog.open(CsvmessageComponent, {
    //       width: '470px',
    //       height: '430px',
    //       data:dataDialog 
          
    //     });
    //   }
     
    // }
    // for(var k=0;k<res.length;k++)
    // {
    //   if ((res[k].split('@').length - 1)==1)
    //   {
       
    //   }
      // else{
      //   let dataDialog = { title: 'Campaign Schedule Successfully!' };
      //   const dialogRef = this.dialog.open(CsvmessageComponent, {
      //     width: '470px',
      //     height: '430px',
      //     data:dataDialog 
          
      //   });
      // }
     
    // }
    this.vare = JSON.stringify(this.res);
    console.log(this.res)  
  
  }
     // this.text.push(reader.result); 
      //convert text to json here
      
      //console.log(this.victcsv)
      // var nLines = 0;
      // for( var i = 0, n = this.text.length;  i < n;  ++i ) {
      //     if( this.text[i] === '\n' ) {
      //         ++nLines;
      //     }
      //     if(this.text[i] !== '\n' )
      //     {
      //       this.vare = this.text[i];
            
      //     }
    // }
    // console.log(this.vare)
    // console.log(nLines+1)
    
    // };
   
  }

  
  schedulelater(){
    if(this.csvcheck === false)
    {
      return
    }
    if (this.res.length)
    {
      let ed = Math.round(this.res.length/220)
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
    if(this.phisingForm.invalid)
    return;
    if(localStorage.getItem('name')=="" || localStorage.getItem('templateDescription') == "" || localStorage.getItem('templateHeading') == "" || localStorage.getItem('addNote')== "" || localStorage.getItem('emailSignature')=="")
    {
      this.toastr.error("please EDIT the Fields")
      return;
    }
    if(localStorage.getItem('email1') == "")
    {
      this.toastr.error("please provide email id")
      return;
    }
    if(localStorage.getItem('password') == "")
    {
      this.toastr.error("please provide password")
      return;
    }
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


}
