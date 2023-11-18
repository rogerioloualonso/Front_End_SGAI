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
import { WelcomeDiscenteComponent } from './pages/discente/welcome/welcome.component';
import { WelcomeDocenteComponent } from './pages/docente/welcome/welcome.component';
import { ListaTurmaComponent } from './pages/docente/listaTurmas/ListaTurma.component';
import { TurmaService } from './services/turma.service';
import { AgendamentoComponent } from './pages/docente/agendamento/agendamento.component';
import { AulasComponent } from './pages/docente/aulas/aulas.component';

@NgModule({
  declarations: [
    TemplateComponent,
    FooterComponent,
    HeaderComponent,
    AppComponent,
    SpinnerComponent,
    LoginComponent,
    WelcomeDiscenteComponent,
    WelcomeDocenteComponent,
    AgendamentoComponent,
    AulasComponent,
    ListaTurmaComponent,
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
    TurmaService,
    ToastModule,
    Utils,
    SharedUtil
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
