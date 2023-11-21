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
import { PresencaComponent } from './pages/docente/presenca/presenca.component';
import { ListaTurmaDiscenteComponent } from './pages/discente/listaTurmas/ListaTurma.component';
import { MarcarPresencaComponent } from './pages/discente/presenca/marcarPresenca.component';
import { RatingComponent } from './pages/discente/presenca/rating/rating.component';
import { ComentarioComponent } from './pages/discente/presenca/comentario/comentario.component';
import { WelcomeAdminComponent } from './pages/admin/welcome/welcome.component';
import { AmbienteComponent } from './pages/admin/ambiente/ambiente.component';
import { FormAmbienteComponent } from './pages/admin/ambiente/Form/form.component';
import { DocenteComponent } from './pages/admin/docente/docente.component';
import { FormDocenteComponent } from './pages/admin/docente/form/form.component';
import { DiscenteComponent } from './pages/admin/discente/discente.component';
import { FormDiscenteComponent } from './pages/admin/discente/form/form.component';
import { TurmaComponent } from './pages/admin/turma/turma.component';
import { FormTurmaComponent } from './pages/admin/turma/form/form.component';
import { listaDiscenteComponent } from './pages/admin/turma/listaDiscentes/listaDiscente.component';
import { buscarDiscenteComponent } from './pages/admin/turma/buscarDiscente/buscarDiscente.component';

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
    PresencaComponent,
    AulasComponent,
    ListaTurmaComponent,
    ListaTurmaDiscenteComponent,
    MarcarPresencaComponent,
    RatingComponent,
    ComentarioComponent,
    WelcomeAdminComponent,
    AmbienteComponent,
    FormAmbienteComponent,
    DocenteComponent,
    FormDocenteComponent,
    DiscenteComponent,
    FormDiscenteComponent,
    TurmaComponent,
    FormTurmaComponent,
    listaDiscenteComponent,
    buscarDiscenteComponent,
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
