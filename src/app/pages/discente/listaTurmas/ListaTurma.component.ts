import { ActivatedRoute, Router} from '@angular/router';
import { Component, Input, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { MessageService } from 'primeng/api';
import { Turma } from 'src/app/models/turma.model';
import { TurmaService } from 'src/app/services/turma.service';

@Component({
  selector: 'app-listaturmadiscente',
  templateUrl: './listaTurma.component.html',
  styleUrls: ['./listaTurma.component.css'],
})
export class ListaTurmaDiscenteComponent implements OnInit {
  @Input() mensagem: string;
  formGroup: FormGroup;
  sessaoExpirou: boolean
  mensagemError: string;
  loadModal: boolean = false;

  role: any;
  idDiscente:any;
  turmas: any;

  constructor(
    protected router: Router,
    public route: ActivatedRoute,
    protected messageService: MessageService,
    private turmaService: TurmaService
  ) {

  }

  ngOnInit() {
    this.role = this.router.url;
    this.idDiscente = sessionStorage.getItem("idDiscente");
    this.getTurmasDiscente(this.idDiscente);
  }

  getTurmasDiscente(id: any) {
    this.turmaService.getTurmaByIdDiscente(id).then((turmas: Turma[]) => {
      this.turmas = turmas;
    }).catch(err => {
      this.router.navigate(['/error-sessao']);
    });
  }

  goEventos(){
    sessionStorage.setItem('idDiscente', this.idDiscente);
    this.router.navigate(['discente/aulas']);
  }

}