import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiInterceptorService } from './services/api-interceptor.service';
import {NavbarComponent} from '../app/navbar/navbar.component';
import { InteractionType, IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './app.config';
import { MsalGuard, MsalBroadcastService, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MsalGuardConfiguration } from '@azure/msal-angular';
import { LoaderService } from './modules/main/service/loader.service';

import { SendcampaignComponent } from './modules/main/sendcampaign/sendcampaign.component';
import { SchedulelaterComponent } from './modules/main/schedulelater/schedulelater.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ResponsiveService } from './services/responsive.service';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmpOnboardComponent } from './modules/employee-onboarding/emp-onboard/emp-onboard.component';
import { PasswordDialogComponent } from './modules/employee-onboarding/password-dialog/password-dialog.component';
import { OfficialDetailsComponent } from './modules/employee-onboarding/official-details/official-details.component';
import { MatIconModule } from '@angular/material/icon';
import { LoadSpinnerComponent } from './loader/load-spinner/load-spinner.component';
import { LoadSpinnerInterceptor } from './loader/intercepter/load-spinner.interceptor';
import { MatMenuModule } from '@angular/material/menu';
export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication(msalConfig);
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return { 
    interactionType: InteractionType.Redirect,
  };
}
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SchedulelaterComponent,
    SendcampaignComponent,
    SideBarComponent,
    LoadSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatMenuModule
  ],
  providers: [ LoaderService,
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService, 
    { provide: 'BASE_API_URL', useValue: environment.apiUrl },
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadSpinnerInterceptor, multi: true },
    ResponsiveService,
  
  ],
      bootstrap: [AppComponent] 
    })
export class AppModule { }
