import { ActivatedRoute, Router} from '@angular/router';
import { Component, Input, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { DiscenteService } from 'src/app/services/discente.service';
import { Discente } from 'src/app/models/discente.model';

@Component({
  selector: 'app-welcomediscente',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeDiscenteComponent implements OnInit {
  @Input() mensagem: string;
  formGroup: FormGroup;
  sessaoExpirou: boolean
  mensagemError: string;
  loadModal: boolean = false;

  role: any;
  cpf:any;
  discente:any;

  constructor(
    protected router: Router,
    public route: ActivatedRoute,
    protected messageService: MessageService,
    private discenteService: DiscenteService
  ) {

  }

  ngOnInit() {
    this.role = this.router.url;
    this.cpf = sessionStorage.getItem("cpf");

    this.getDocente(this.cpf);
    sessionStorage.setItem('idDiscente', this.discente.id);
  }

  getDocente(cpf: any) {
    this.discenteService.getDiscenteByCPF(cpf).then((discente: Discente) => {
      this.discente = discente;
    }).catch(err => {
      this.router.navigate(['/error-sessao']);
    });
  }

  goTurmas(){
    sessionStorage.setItem('idDiscente', this.discente.id);
    this.router.navigate(['discente/turmas']);
  }

  goEventos(){
    sessionStorage.setItem('idDiscente', this.discente.id);
    this.router.navigate(['discente/aulas']);
  }

}