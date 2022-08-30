import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiInterceptorService } from './services/api-interceptor.service';
import {ConfirmationModalComponent} from './shared/confirmation-modal/confirmation-modal.component';
import {NavbarComponent} from '../app/navbar/navbar.component';
import { ChartsModule } from 'ng2-charts';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ToastrModule } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InteractionType, IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './app.config';
import { MsalGuard, MsalBroadcastService, MsalModule, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MsalGuardConfiguration, MsalRedirectComponent } from '@azure/msal-angular';
import { LoaderService } from './modules/main/service/loader.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SchedulelaterComponent } from './shared/schedulelater/schedulelater.component';
import { MatInputModule } from '@angular/material/input';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { SendcampaignComponent } from './shared/sendcampaign/sendcampaign.component';
import { ScheduleCampComponent } from './shared/schedule-camp/schedule-camp.component';
import { MatDialogModule } from '@angular/material/dialog';

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
    ConfirmationModalComponent,
    NavbarComponent,
    SchedulelaterComponent,
    SendcampaignComponent,
    ScheduleCampComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatIconModule,
    ChartsModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatTableExporterModule,
    MatButtonModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    NgxMaterialTimepickerModule,
    ReactiveFormsModule,
    MatDialogModule
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
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptorService, multi: true }],
      bootstrap: [AppComponent] 
    })
export class AppModule { }
