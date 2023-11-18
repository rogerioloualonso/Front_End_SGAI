import { ActivatedRoute, Router} from '@angular/router';
import { Component, Input, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/services/login.service';
import { Credencias } from 'src/app/models/credencias.model';

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
    cpf: "",
    senha: ""
  }

  constructor(
    protected router: Router,
    public route: ActivatedRoute,
    private frmBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    protected messageService: MessageService,
    private auth: LoginService
  ) {

  }

  ngOnInit() {
    this.role = this.router.url;

    this.formGroup = this.frmBuilder.group({
      'cpf': ['', [Validators.required]],
      'senha': ['', [Validators.required]]
    });

    this.formGroup.patchValue(this.creds);
    this.limparSessao();
    sessionStorage.setItem('timeOut', 'ativa');
  }

  public login() {
    this.spinner.show();

    this.creds.cpf = this.formGroup.get('cpf').value;
    this.creds.senha = this.formGroup.get('senha').value;

    if(this.role == "/discente"){
      this.auth.authenticateDiscente(this.creds).subscribe((result: any) => {
        if(result){
          sessionStorage.setItem('user', 'discente');
          sessionStorage.setItem('cpf', this.creds.cpf);
          this.spinner.hide();
          this.router.navigate(['welcome'], { relativeTo: this.route });
        }else{
          this.spinner.hide();
          this.messageService.add({ key: 'toast', severity: 'error', summary: "Atenção!" , detail: "Verifique suas credenciais e tente novamente." });
        }
      }, err => {
        this.spinner.hide();
        this.messageService.add({ key: 'toast', severity: 'error', summary: "Atenção!" , detail: "Ocorreu um erro inesperado." });
        this.formGroup.reset();
      })
    }else if(this.role == "/docente"){
      this.auth.authenticateDocente(this.creds).subscribe((result: any) => {
        if(result){
          sessionStorage.setItem('user', 'docente');
          sessionStorage.setItem('cpf', this.creds.cpf);
          this.spinner.hide();
          this.router.navigate(['welcome'], { relativeTo: this.route });
        }else{
          this.spinner.hide();
          this.messageService.add({ key: 'toast', severity: 'error', summary: "Atenção!" , detail: "Verifique suas credenciais e tente novamente." });
        }
      }, err => {
        this.spinner.hide();
        this.messageService.add({ key: 'toast', severity: 'error', summary: "Atenção!" , detail: "Ocorreu um erro inesperado." });
        this.formGroup.reset();
      })
    }
    
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