import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {ApiCallsModule} from './api-calls/api-calls.module';
import {StoreModule} from '@ngrx/store';
import {reducer} from './store/app.reducer';
import {environment} from '../environments/environment';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {ApiCallEffect} from './api-calls/store/api-call-effect';
import {HttpClientModule} from '@angular/common/http';
import { TaskFormComponent } from './task-form/task-form.component';
import {FormsModule} from '@angular/forms';
import {MatDatepickerModule, MatNativeDateModule, MatTableModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    TaskFormComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ApiCallsModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    StoreModule.forRoot(reducer),
    EffectsModule.forRoot([ApiCallEffect]),
    !environment.production ? StoreDevtoolsModule.instrument({
      maxAge: 30,

    }) : [],
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
