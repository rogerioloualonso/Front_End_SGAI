
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { WelcomeDocenteComponent } from '../pages/docente/welcome/welcome.component';
import { Turma } from '../models/turma.model';
import { Discente } from '../models/discente.model';

@Injectable({
  providedIn: 'root'
})

export class TurmaService {
  welcomeDocente: WelcomeDocenteComponent;
  configHeader: { headers: { Authorization: any; }; };

  constructor(
    private http: HttpClient
  ) { }
       
  public getTurmaByIdDocente(id: any) {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.url_api}/turma/byDocente/${id}`).subscribe(
        payload => {
          resolve(payload)
        }, err => {
          reject(err.error.message);
        }  
      )
    })
  }

  public getTurmaByIdDiscente(id: any) {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.url_api}/turma/byDiscente/${id}`).subscribe(
        payload => {
          resolve(payload)
        }, err => {
          reject(err.error.message);
        }  
      )
    })
  }

  public getTurmaById(id: any) {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.url_api}/turma/byId/${id}`).subscribe(
        payload => {
          resolve(payload)
        }, err => {
          reject(err.error.message);
        }  
      )
    })
  }

  public getAllTurmas() {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.url_api}/turma/all`).subscribe(
        payload => {
          resolve(payload)
        }, err => {
          reject(err.error.message);
        }  
      )
    })
  }

  public excluir(id: any) {
    return this.http.delete(`${environment.url_api}/turma/excluir/${id}`, id)
  }

  public salvarTurma(data: Turma) {
    return this.http.post(`${environment.url_api}/turma`, data)
  }

  public atualizarTurma(data: Turma) {
    return this.http.post(`${environment.url_api}/turma/atualizar`, data)
  }

  public incluirDiscenteTurma(data: Discente) {
    return this.http.post(`${environment.url_api}/turma/incluir`, data)
  }

  public removerDiscenteTurma(data: Discente) {
    return this.http.post(`${environment.url_api}/turma/remover`, data)
  }

}