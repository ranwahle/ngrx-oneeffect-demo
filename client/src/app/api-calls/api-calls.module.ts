import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BaseUrlInterceptor} from './base-url-interceptor';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [  {provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true}],
  declarations: []
})
export class ApiCallsModule {
}
