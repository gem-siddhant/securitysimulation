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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule
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
    ResponsiveService,
  
  ],
      bootstrap: [AppComponent] 
    })
export class AppModule { }
