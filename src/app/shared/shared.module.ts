import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { SamplecsvComponent } from './samplecsv/samplecsv.component';
import { CsvmessageComponent } from './csvmessage/csvmessage.component';
import { InfomodalComponent } from './infomodal/infomodal.component';
import { RescheduleComponent } from './reschedule/reschedule.component';
import { ReconfirmModalComponent } from './reconfirm-modal/reconfirm-modal.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { CampaignConfirmComponent } from './campaign-confirm/campaign-confirm.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ChartsModule } from 'ng2-charts';
import { ToastrModule } from 'ngx-toastr';
import { SendCampaignModalComponent } from './send-campaign-modal/send-campaign-modal.component';
import { DownloadCsvModalComponent } from './download-csv-modal/download-csv-modal.component';

@NgModule({
  declarations: [
    DeleteModalComponent,
    ReconfirmModalComponent,
    CampaignConfirmComponent,
    RescheduleComponent,
    InfomodalComponent,
    CsvmessageComponent,
    SamplecsvComponent,
    ConfirmationModalComponent,
    SendCampaignModalComponent,
    DownloadCsvModalComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogModule,
    MatTableModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatDividerModule,
    MatButtonModule,
    MatTableExporterModule,
    ChartsModule,
    ToastrModule.forRoot(),
  ],
  exports : [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatDividerModule,
    MatButtonModule,
    MatTableExporterModule,
    ChartsModule,
    ToastrModule,
  ]
})
export class SharedModule { }
