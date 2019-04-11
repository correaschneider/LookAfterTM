import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {
    MatCardModule,
    MatGridListModule,
    MatSnackBarModule,
    MatButtonModule
} from '@angular/material';

const MatModule = [
  MatCardModule,
  MatGridListModule,
  MatSnackBarModule,
  MatButtonModule
];

import { DiaperService } from './services/diaper.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SnackbarComponent } from './snackbar/snackbar.component';

const Components = [
  AppComponent,
  HomeComponent,
  SnackbarComponent
];

@NgModule({
  declarations: [
    ...Components
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ...MatModule
  ],
  providers: [DiaperService],
  bootstrap: [AppComponent],
  entryComponents:[ SnackbarComponent ]
})
export class AppModule { }
