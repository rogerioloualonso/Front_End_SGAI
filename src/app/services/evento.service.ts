
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

}