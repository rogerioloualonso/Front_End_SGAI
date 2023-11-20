
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { WelcomeDocenteComponent } from '../pages/docente/welcome/welcome.component';
import { Ambiente } from '../models/ambiente.model';

@Injectable({
  providedIn: 'root'
})

export class AmbienteService {
  welcomeDocente: WelcomeDocenteComponent;
  configHeader: { headers: { Authorization: any; }; };

  constructor(
    private http: HttpClient
  ) { }
       
  public getAmbientes() {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.url_api}/ambiente/all`).subscribe(
        payload => {
          resolve(payload)
        }, err => {
          reject(err.error.message);
        }  
      )
    })
  }

  public getAmbiente(id:any) {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.url_api}/ambiente/byID/${id}`).subscribe(
        payload => {
          resolve(payload)
        }, err => {
          reject(err.error.message);
        }  
      )
    })
  }

  public excluir(id: any) {
    return this.http.delete(`${environment.url_api}/ambiente/excluir/${id}`, id)
  }

  public salvarAmbiente(data: Ambiente) {
    return this.http.post(`${environment.url_api}/ambiente`, data)
  }

  public atualizarAmbiente(data: Ambiente) {
    return this.http.post(`${environment.url_api}/ambiente/atualizar`, data)
  }

}