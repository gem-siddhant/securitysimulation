import { NgModule } from '@angular/core';
import { GiftRoutingModule } from './gift-routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {MatRadioModule} from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { ChartsModule } from 'ng2-charts';
import {MatCardModule} from '@angular/material/card';
import { MatTableModule } from '@angular/material/table'
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { GiftComponent } from './gift.component';
@NgModule({
  declarations: [
    GiftComponent,
  ],
  imports: [
    GiftRoutingModule,
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
    NgxMaterialTimepickerModule
  ]
})
export class giftModule { }