import { ActivatedRoute, Router} from '@angular/router';
import { Component, Input, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { DocenteService } from 'src/app/services/docente.service';
import { Turma } from 'src/app/models/turma.model';
import { TurmaService } from 'src/app/services/turma.service';

@Component({
  selector: 'app-listaturma',
  templateUrl: './listaTurma.component.html',
  styleUrls: ['./listaTurma.component.css'],
})
export class ListaTurmaComponent implements OnInit {
  @Input() mensagem: string;
  formGroup: FormGroup;
  sessaoExpirou: boolean
  mensagemError: string;
  loadModal: boolean = false;

  role: any;
  idDocente:any;
  turmas: any;

  constructor(
    protected router: Router,
    public route: ActivatedRoute,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    protected messageService: MessageService,
    private turmaService: TurmaService
  ) {

  }

  ngOnInit() {
    this.role = this.router.url;
    this.idDocente = sessionStorage.getItem("idDocente");
    console.log(this.idDocente);
    this.getTurmasDocente(this.idDocente);
  }

  getTurmasDocente(cpf: any) {
    this.turmaService.getTurmaById(cpf).then((turmas: Turma[]) => {
      this.turmas = turmas;
    }).catch(err => {
      this.router.navigate(['/error-sessao']);
    });
  }

  goAgendar(){
    sessionStorage.setItem('idDocente', this.idDocente);
    this.router.navigate(['docente/agendar']);
  }

}