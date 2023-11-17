
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credencias } from '../models/credencias.model';
import { environment } from '../../environments/environment';
import { LoginComponent } from '../pages/login/login.component';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  loginAdmin: LoginComponent;
  configHeader: { headers: { Authorization: any; }; };

  constructor(
    private http: HttpClient
  ) { }
       
  public authenticateDiscente(creds: Credencias) {
    return this.http.post(`${environment.url_api}/auth/discente`, creds)
  }

  public authenticateDocente(creds: Credencias) {
    return this.http.post(`${environment.url_api}/auth/docente`, creds)
  }

}