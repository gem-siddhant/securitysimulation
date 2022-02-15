import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {MatIconModule} from '@angular/material/icon';

import { ApiInterceptorService } from './services/api-interceptor.service';
import {ConfirmationModalComponent} from './shared/confirmation-modal/confirmation-modal.component';
import {NavbarComponent} from '../app/navbar/navbar.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmationModalComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    HttpClientModule,
    MatIconModule,
    ChartsModule

  ],
  providers: [  { provide: 'BASE_API_URL', useValue: environment.apiUrl },
  { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
