
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credencias } from '../models/credencias.model';
import { environment } from '../../environments/environment';
import { LoginComponent } from '../pages/login/login.component';
import { WelcomeDocenteComponent } from '../pages/docente/welcome/welcome.component';
import { Docente } from '../models/docente.model';

@Injectable({
  providedIn: 'root'
})

export class DocenteService {
  welcomeDocente: WelcomeDocenteComponent;
  configHeader: { headers: { Authorization: any; }; };

  constructor(
    private http: HttpClient
  ) { }
       
  public getDocenteByCPF(cpf: any) {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.url_api}/docente/${cpf}`).subscribe(
        payload => {
          resolve(payload)
        }, err => {
          reject(err.error.message);
        }  
      )
    })
  }

  public getDocenteById(id: any) {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.url_api}/docente/byId/${id}`).subscribe(
        payload => {
          resolve(payload)
        }, err => {
          reject(err.error.message);
        }  
      )
    })
  }

  public getAllDocentes() {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.url_api}/docente/all`).subscribe(
        payload => {
          resolve(payload)
        }, err => {
          reject(err.error.message);
        }  
      )
    })
  }

  public excluir(id: any) {
    return this.http.delete(`${environment.url_api}/docente/excluir/${id}`, id)
  }

  public salvarDocente(data: Docente) {
    return this.http.post(`${environment.url_api}/docente`, data)
  }

  public atualizarDocente(data: Docente) {
    return this.http.post(`${environment.url_api}/docente/atualizar`, data)
  }

}