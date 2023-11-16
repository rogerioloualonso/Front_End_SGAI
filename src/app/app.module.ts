import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask'
import { HttpClientModule } from '@angular/common/http';
import { TemplateComponent } from './core/components/layout/template.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { HeaderComponent } from './core/components/layout/header/header.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SpinnerComponent } from './core/components/spinner/spinner.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Error403Component } from './pages/error/error403/error403.component';
import { Error404Component } from './pages/error/error404/error404.component';
import { Utils } from './utils/utils';
import { SharedUtil } from './utils/SharedUtil';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [
    TemplateComponent,
    FooterComponent,
    HeaderComponent,
    AppComponent,
    SpinnerComponent,
    LoginComponent,
    Error403Component,
    Error404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    HttpClientModule,
    FormsModule,
    ToastModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    NgxSpinnerModule,
    MessageService,
    ToastModule,
    Utils,
    SharedUtil
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
