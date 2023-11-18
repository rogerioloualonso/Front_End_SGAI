
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { WelcomeDocenteComponent } from '../pages/docente/welcome/welcome.component';
import { Agendamento } from '../models/agendamento.model';

@Injectable({
  providedIn: 'root'
})

export class EventoService {
  welcomeDocente: WelcomeDocenteComponent;
  configHeader: { headers: { Authorization: any; }; };

  constructor(
    private http: HttpClient
  ) { }
       
  public salvarEvento(data: Agendamento) {
    return this.http.post(`${environment.url_api}/evento`, data)
  }

  public iniciarEvento(id: any) {
    return this.http.post(`${environment.url_api}/evento/iniciar/${id}`, id)
  }

  public finalizarEvento(id: any) {
    return this.http.post(`${environment.url_api}/evento/finalizar/${id}`, id)
  }

  public excluirEvento(id: any) {
    return this.http.delete(`${environment.url_api}/evento/excluir/${id}`, id)
  }


  public getEventoByDocente(idDocente: any) {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.url_api}/evento/${idDocente}`).subscribe(
        payload => {
          resolve(payload)
        }, err => {
          reject(err.error.message);
        }  
      )
    })
  }

}