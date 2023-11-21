
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { WelcomeDocenteComponent } from '../pages/docente/welcome/welcome.component';
import { Discente } from '../models/discente.model';

@Injectable({
  providedIn: 'root'
})

export class DiscenteService {
  welcomeDocente: WelcomeDocenteComponent;
  configHeader: { headers: { Authorization: any; }; };

  constructor(
    private http: HttpClient
  ) { }
       
  public getDiscenteByCPF(cpf: any) {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.url_api}/discente/${cpf}`).subscribe(
        payload => {
          resolve(payload)
        }, err => {
          reject(err.error.message);
        }  
      )
    })
  }

  public getDiscenteById(id: any) {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.url_api}/discente/byId/${id}`).subscribe(
        payload => {
          resolve(payload)
        }, err => {
          reject(err.error.message);
        }  
      )
    })
  }

  public getAllDiscentes() {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.url_api}/discente/all`).subscribe(
        payload => {
          resolve(payload)
        }, err => {
          reject(err.error.message);
        }  
      )
    })
  }

  public excluir(id: any) {
    return this.http.delete(`${environment.url_api}/discente/excluir/${id}`, id)
  }

  public salvarDiscente(data: Discente) {
    return this.http.post(`${environment.url_api}/discente`, data)
  }

  public atualizarDiscente(data: Discente) {
    return this.http.post(`${environment.url_api}/discente/atualizar`, data)
  }

}