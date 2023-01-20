import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {

    public isMobile = new Subject();
    public screenStatus = new Subject<String>();
    public screenWidth: String;


    constructor() {
        this.checkWidth();
        this.screenWidth='';
    }

    onMobileChange(status: boolean) {
        this.isMobile.next(status);
    }
    screenStatusChange(status : String){
        this.screenStatus.next(status);
    }
    getScreenStatus() : Observable<String> {
        return this.screenStatus.asObservable();
    }

    getMobileStatus(): Observable<any> {
        return this.isMobile.asObservable();
    }

    public checkWidth() {
        var width = window.innerWidth;
        if (width <= 576) {
            this.screenWidth = 'xs';
            this.onMobileChange(true);
        }
        else if (width <= 768) {
            this.screenWidth = 'sm';
            this.onMobileChange(true);
        } else if (width > 768 && width <= 992) {
            this.screenWidth = 'md';
            this.onMobileChange(false);
        } else {
            this.screenWidth = 'lg';
            this.onMobileChange(false);
        }
        this.screenStatusChange(this.screenWidth);
    }

}
