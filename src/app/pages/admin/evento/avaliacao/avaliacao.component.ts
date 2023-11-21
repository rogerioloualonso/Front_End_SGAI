import { ActivatedRoute, Router} from '@angular/router';
import { Component, Input, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Aula } from 'src/app/models/aula.model';
import { EventoService } from 'src/app/services/evento.service';
import { AvaliacaoService } from 'src/app/services/avaliacao.service';
import { Avaliacao } from 'src/app/models/avaliacao.model';

@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.component.html',
  styleUrls: ['./avaliacao.component.css'],
})
export class AvaliacaoComponent implements OnInit {
  @Input() mensagem: string;
  formGroup: FormGroup;
  sessaoExpirou: boolean
  mensagemError: string;
  loadModal: boolean = false;

  role: any;
  idEvento:any;
  avaliacoes: any;

  constructor(
    protected router: Router,
    public route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    protected messageService: MessageService,
    private avaliacaoService: AvaliacaoService,
  ) {

  }

  ngOnInit() {
    this.role = this.router.url;
    this.idEvento = sessionStorage.getItem("idEvento");
    this.getAvaliacaoByEvento(this.idEvento);
  }

  getAvaliacaoByEvento(idEvento: any) {
    this.avaliacaoService.getAvaliacaoByTurma(idEvento).then((avaliacoes: Avaliacao[]) => {
      this.avaliacoes = avaliacoes;
    }).catch(err => {
      this.router.navigate(['/error-sessao']);
    });
  }

  goAmbiente(){
    this.router.navigate(['admin/ambiente']);
  }

  goDiscente(){
    this.router.navigate(['admin/discente']);
  }

  goDocente(){
    this.router.navigate(['admin/docente']);
  }

  goTurma(){
    this.router.navigate(['admin/turma']);
  }

  goEvento(){
    this.router.navigate(['admin/evento']);
  }

}