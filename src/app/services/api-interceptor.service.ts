import { LowerCasePipe } from '@angular/common';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { localizedString } from '@angular/compiler/src/output/output_ast';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from '../modules/main/service/loader.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiInterceptorService {

  constructor(@Inject('BASE_API_URL') private baseUrl: string,private _auth:AuthService) {

  }

intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  let authToken=localStorage.getItem('token')
    let apiReq:any;
  apiReq = request.clone(
      {
          url: `${this.baseUrl}/${request.url}`,
      }
  );
  if (authToken) {
    apiReq = apiReq.clone({setHeaders: {
      'Authorization': 'Bearer '+authToken,
      // 'Access-Control-Allow-Origin': '*'
    }});
}
  return next.handle(apiReq);
}
}
