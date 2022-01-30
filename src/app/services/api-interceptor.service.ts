import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiInterceptorService {

  constructor(@Inject('BASE_API_URL') private baseUrl: string) {

  }

intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
console.log('HHII');
    let apiReq:any;
  apiReq = request.clone(
      {
          url: `${this.baseUrl}/${request.url}`,
      }
  );
  console.log(this.baseUrl, request.url);
  console.log(apiReq);
  return next.handle(apiReq);
}
}
