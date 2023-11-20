import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error403Component } from './pages/error/error403/error403.component';
import { Error404Component } from './pages/error/error404/error404.component';
import { LoginComponent } from './pages/login/login.component';
import { WelcomeDiscenteComponent } from './pages/discente/welcome/welcome.component';
import {  WelcomeDocenteComponent } from './pages/docente/welcome/welcome.component';
import { ListaTurmaComponent } from './pages/docente/listaTurmas/ListaTurma.component';
import { AgendamentoComponent } from './pages/docente/agendamento/agendamento.component';
import { AulasComponent } from './pages/docente/aulas/aulas.component';
import { PresencaComponent } from './pages/docente/presenca/presenca.component';
import { ListaTurmaDiscenteComponent } from './pages/discente/listaTurmas/ListaTurma.component';
import { MarcarPresencaComponent } from './pages/discente/presenca/marcarPresenca.component';
import { RatingComponent } from './pages/discente/presenca/rating/rating.component';
import { ComentarioComponent } from './pages/discente/presenca/comentario/comentario.component';


const routes: Routes = [
  {
    path: 'discente',
    children: [
      {
        path: '', component: LoginComponent
      },
      {
        path: 'welcome', component: WelcomeDiscenteComponent
      }
      ,
      {
        path: 'turmas', component: ListaTurmaDiscenteComponent
      },
      {
        path: 'aulas', component: MarcarPresencaComponent
      },
      {
        path: 'aulas/rating', component: RatingComponent
      },
      {
        path: 'aulas/rating/comentario', component: ComentarioComponent
      }
    ]
  },
  {
    path: 'docente',
    children: [
      {
        path: '', component: LoginComponent
      },
      {
        path: 'welcome', component: WelcomeDocenteComponent
      },
      {
        path: 'turmas', component: ListaTurmaComponent
      },
      {
        path: 'agendar', component: AgendamentoComponent
      }
      ,
      {
        path: 'aulas', component: AulasComponent,
      },
      {
        path: 'aulas/presenca', component: PresencaComponent,
      }
    ]
  },
  {
    path: 'error-sessao', component: Error403Component,
  },
  {
    path: '**', component: Error404Component,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
