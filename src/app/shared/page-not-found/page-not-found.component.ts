import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/modules/main/service/main.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {
  email: any;
  ipAddress: any;
  id: any;
  constructor(private route: ActivatedRoute, private http: HttpClient, private _mainService: MainService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.email = params['token'];
        this.id = params['vals'];
      }
    )
    console.log('token', this.email);
    console.log('id', this.id);
    this.http.get<{ ip: string }>('https://jsonip.com')
      .subscribe(data => {
        this.ipAddress = data.ip
        this.sendData(this.email, this.ipAddress, this.id);
      })
  }
  sendData(emailID: any, ip: any, id: any) {
    let obj = {
      'token': emailID,
      'ip': ip,
      'vals': id
    }
    this._mainService.sendUserDetails(obj).subscribe((data: any) => {
      if (data) {
        console.log('data sent');
      }
    })
  }

}
