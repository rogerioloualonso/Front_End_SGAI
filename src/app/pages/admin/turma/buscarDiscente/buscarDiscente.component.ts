import { ActivatedRoute, Router} from '@angular/router';
import { Component, Input, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventoService } from 'src/app/services/evento.service';
import { AmbienteService } from 'src/app/services/ambiente.service';
import { Ambiente } from 'src/app/models/ambiente.model';
import { Docente } from 'src/app/models/docente.model';
import { DocenteService } from 'src/app/services/docente.service';
import { DiscenteService } from 'src/app/services/discente.service';
import { Discente } from 'src/app/models/discente.model';
import { TurmaService } from 'src/app/services/turma.service';

@Component({
  selector: 'app-buscardiscente',
  templateUrl: './buscarDiscente.component.html',
  styleUrls: ['./buscarDiscente.component.css'],
})
export class buscarDiscenteComponent implements OnInit {
  @Input() mensagem: string;
  formGroup: FormGroup;
  sessaoExpirou: boolean
  mensagemError: string;
  loadModal: boolean = false;

  role: any;
  idDiscente:any;
  idTurma: any;
  discente: any;
  currentCPF: any;

  constructor(
    protected router: Router,
    public route: ActivatedRoute,
    private frmBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    protected messageService: MessageService,
    private discenteService: DiscenteService,
    private turmaService: TurmaService
  ) {

  }

  ngOnInit() {
    this.role = this.router.url;
    this.idTurma = sessionStorage.getItem("idTurma");

    this.formGroup = this.frmBuilder.group({
      'cpf': ['', [Validators.required]]
    });
  }

  async onSubmit(value) {
    this.getDiscentesByCPF();
  }

  getDiscentesByCPF() {
    this.currentCPF = this.formGroup.get('cpf').value;
    this.discenteService.getDiscenteByCPF(this.currentCPF).then((discente: Discente) => {
      this.discente = discente;
    }).catch(err => {
      this.router.navigate(['/error-sessao']);
    });
  }

  adicionar(){
    this.discente.idTurma = this.idTurma;
    this.turmaService.incluirDiscenteTurma(this.discente).subscribe((result: any) => {
      if(!result){
        this.messageService.add({ key: 'toast', severity: 'error', summary: "Atenção!" , detail: "Discente já pertence a Turma!" });
      }else{
        this.messageService.add({ key: 'toast', severity: 'success', summary: "Sucesso!" , detail: "Discente Incluído na Turma!" });
      }
      this.discente = "";
  }, err => {
    this.spinner.hide();
    this.messageService.add({ key: 'toast', severity: 'error', summary: "Atenção!" , detail: "Ocorreu um erro inesperado." });
    this.formGroup.reset();
  })
  }

  goAmbiente(){
    this.router.navigate(['admin/ambiente']);
  }

  goDocente(){
    this.router.navigate(['admin/docente']);
  }

  goTurma(){
    this.router.navigate(['admin/turma']);
  }

  goDiscente(){
    this.router.navigate(['admin/discente']);
  }

  goEvento(){
    this.router.navigate(['admin/evento']);
  }

}