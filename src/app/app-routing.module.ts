import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error403Component } from './pages/error/error403/error403.component';
import { Error404Component } from './pages/error/error404/error404.component';
import { LoginComponent } from './pages/login/login.component';


const routes: Routes = [
  {
    path: 'admin',
    children: [
      {
        path: '', component: LoginComponent
      },
      /*{
        path: 'relatorio', component: RelatorioComponent
      }*/
    ]
  },
  /*{
    path: 'johnson', children: [
      {
        path: '', component: AgendamentoComponent
      },
      {
        path: 'agendamento', component: CadastroComponent
      },
      {
        path: 'confirmacao', component: ConfirmacaoComponent
      }
    ]
  },*/
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
