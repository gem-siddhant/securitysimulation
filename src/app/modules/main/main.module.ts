import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {MatRadioModule} from '@angular/material/radio';
import { MainRoutingModule } from './main-routing.module';
import { GiftComponent } from './gift/gift.component';
import { AddCampaignComponent } from './add-campaign/add-campaign.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatDialogModule} from '@angular/material/dialog';
import { CampaignViewComponent } from './campaign-view/campaign-view.component';
import {MatIconModule} from '@angular/material/icon';
import { ChartsModule } from 'ng2-charts';
import {MatCardModule} from '@angular/material/card';
import { MatTableModule } from '@angular/material/table'
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { OnboardresComponent } from './onboard/onboardres/onboardres.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ɵAnimationGroupPlayer } from '@angular/animations';
@NgModule({
  declarations: [
    GiftComponent,
    AddCampaignComponent,
    LoginComponent,
    DashboardComponent,
    CampaignViewComponent,
    SignUpComponent,
    OnboardresComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    HttpClientModule,
    MatRadioModule,
    MatTableExporterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    ChartsModule,
    MatCardModule,
    MatTableModule,
    MatSelectModule,
    FormsModule,
    ToastrModule.forRoot(),
    MatProgressSpinnerModule,
    MatDatepickerModule,
    NgxMaterialTimepickerModule,
    MatSlideToggleModule
  ]
})
export class MainModule { }
