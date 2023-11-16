import { ActivatedRoute, Router} from '@angular/router';
import { Component, Input, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/services/login.service';
import { Credencias } from 'src/app/models/credencias.model';
//import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Input() mensagem: string;

  formGroup: FormGroup;
  sessaoExpirou: boolean
  mensagemError: string;
  loadModal: boolean = false;

  role: any;

  creds: Credencias = {
    login: "",
    senha: ""
  }

  constructor(
    protected router: Router,
    public route: ActivatedRoute,
    private frmBuilder: FormBuilder,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    protected messageService: MessageService,
    private auth: LoginService
  ) {

  }

  ngOnInit() {
    this.role = this.router.url;

    this.formGroup = this.frmBuilder.group({
      'login': ['', [Validators.required]],
      'senha': ['', [Validators.required]]
    });

    this.formGroup.patchValue(this.creds);
    this.limparSessao();
    sessionStorage.setItem('timeOut', 'ativa');
  }

  public timeoutEncerrarSessao() {
    setTimeout(() => {
      sessionStorage.setItem('timeOut', 'expirou');
      this.router.navigate(['/error-sessao']);
    }, 1680000);
  }

  public login() {
      this.spinner.show();

      this.creds.login = this.formGroup.get('login').value;
      this.creds.senha = this.formGroup.get('senha').value;
      
      this.auth.authenticateLoginAdmin(this.creds).subscribe((result: any) => {
        var token = result.token
        sessionStorage.setItem("token", token)
        var infoAdmin = JSON.parse(sessionStorage.getItem("infoAdmin"))
        this.router.navigate(['relatorio'], { relativeTo: this.route });
      }, err => {
        this.spinner.hide();
        this.messageService.add({ key: 'toast', severity: 'error', summary: "Atenção!" , detail: "Verifique suas credenciais e tente novamente." });
        this.formGroup.reset();
      })
  }

  async onSubmit(value) {
    this.login();
  }

  public limparSessao() {
    sessionStorage.clear();
  }

  public resetPassword(){
    this.messageService.add({ key: 'toast', severity: 'warn', summary: "Atenção!", detail: "Funcionalidade indisponível. Contate o administrador do sistema." });
  }

}