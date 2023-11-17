import { ActivatedRoute, Router} from '@angular/router';
import { Component, Input, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Docente } from 'src/app/models/docente.model';
import { DocenteService } from 'src/app/services/docente.service';

@Component({
  selector: 'app-welcomedocente',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeDocenteComponent implements OnInit {
  @Input() mensagem: string;
  formGroup: FormGroup;
  sessaoExpirou: boolean
  mensagemError: string;
  loadModal: boolean = false;

  role: any;
  nome:any;
  cpf:any;
  docente:any;

  constructor(
    protected router: Router,
    public route: ActivatedRoute,
    private frmBuilder: FormBuilder,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    protected messageService: MessageService,
    private docenteService: DocenteService
  ) {

  }

  ngOnInit() {
    this.role = this.router.url;
    this.cpf = sessionStorage.getItem("cpf");

    this.getDocente(this.cpf);
    sessionStorage.setItem('docente', 'ativa');
  }

  getDocente(cpf: any) {
    this.docenteService.getDocenteByCPF(cpf).then((docente: Docente) => {
      this.docente = docente;
    }).catch(err => {
      this.router.navigate(['/error-sessao']);
    });
  }

}