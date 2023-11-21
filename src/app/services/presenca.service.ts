
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { WelcomeDocenteComponent } from '../pages/docente/welcome/welcome.component';

@Injectable({
  providedIn: 'root'
})

export class PresencaService {
  welcomeDocente: WelcomeDocenteComponent;
  configHeader: { headers: { Authorization: any; }; };

  constructor(
    private http: HttpClient
  ) { }
       
  public getPresencaByIdDiscnte(id: any) {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.url_api}/presenca/byDiscente/${id}`).subscribe(
        payload => {
          resolve(payload)
        }, err => {
          reject(err.error.message);
        }  
      )
    })
  }

  public excluirPresenca(id: any) {
    return this.http.delete(`${environment.url_api}/presenca/excluir/${id}`, id)
  }

}