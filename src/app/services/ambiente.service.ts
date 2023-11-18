
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { WelcomeDocenteComponent } from '../pages/docente/welcome/welcome.component';

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

}