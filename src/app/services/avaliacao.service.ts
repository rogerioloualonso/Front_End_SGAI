
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credencias } from '../models/credencias.model';
import { environment } from '../../environments/environment';
import { LoginComponent } from '../pages/login/login.component';
import { WelcomeDocenteComponent } from '../pages/docente/welcome/welcome.component';
import { Turma } from '../models/turma.model';
import { Discente } from '../models/discente.model';

@Injectable({
  providedIn: 'root'
})

export class AvaliacaoService {
  welcomeDocente: WelcomeDocenteComponent;
  configHeader: { headers: { Authorization: any; }; };

  constructor(
    private http: HttpClient
  ) { }
       
  public getAvaliacaoByTurma(idEvento: any) {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.url_api}/evento/avaliacao/${idEvento}`).subscribe(
        payload => {
          resolve(payload)
        }, err => {
          reject(err.error.message);
        }  
      )
    })
  }

}