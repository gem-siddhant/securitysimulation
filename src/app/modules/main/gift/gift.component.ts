import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-gift',
  templateUrl: './gift.component.html',
  styleUrls: ['./gift.component.css']
})
export class GiftComponent implements OnInit {
  email:any;
  ipAddress: any;
  constructor(private route:ActivatedRoute,private http:HttpClient) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.email =  params['email'];
      }
    )
    this.http.get<{ip:string}>('https://jsonip.com')
    .subscribe( data => {
      this.ipAddress = data.ip
      this.sendData(this.email,this.ipAddress).subscribe((data)=>{
        console.log(data);
      })
    })

  }
  sendData(emailID:any,ip:any){
    console.log(emailID,ip);
    let obj={
      'email':emailID,
      'ip':ip
    }
    return this.http.put<any>('https://contripointdevapi.geminisolutions.com/phising',obj);
  }

}
