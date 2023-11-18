import { ActivatedRoute, Router} from '@angular/router';
import { Component, Input, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { AmbienteService } from 'src/app/services/ambiente.service';
import { Ambiente } from 'src/app/models/ambiente.model';
import { Agendamento } from 'src/app/models/agendamento.model';
import { Turma } from 'src/app/models/turma.model';
import { TurmaService } from 'src/app/services/turma.service';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css'],
})
export class AgendamentoComponent implements OnInit {
  @Input() mensagem: string;
  formGroup: FormGroup;

  role: any;
  idDocente:any;
  ambientes: any;
  turmas: any;

  data: Agendamento = {
    idAmbiente: "",
    idTurma: "",
    data:"",
    horaInicio:"",
    horaFim:""
  }

  constructor(
    protected router: Router,
    public route: ActivatedRoute,
    private frmBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    protected messageService: MessageService,
    private ambienteService: AmbienteService,
    private turmaService: TurmaService,
    private eventoService: EventoService
  ) {

  }

  ngOnInit() {
    this.role = this.router.url;
    this.idDocente = sessionStorage.getItem("idDocente");

    this.formGroup = this.frmBuilder.group({
      'ambiente': ['', [Validators.required]],
      'turma': ['', [Validators.required]],
      'data': ['', [Validators.required]],
      'horaInicio': ['', [Validators.required]],
      'horaFim': ['', [Validators.required]]
    });

    this.getAmbientes();
    this.getTurmasByDocente();
  }

  getAmbientes() {
    this.ambienteService.getAmbientes().then((ambiente: Ambiente) => {
      this.ambientes = ambiente;
    }).catch(err => {
      this.router.navigate(['/error-sessao']);
    });
  }

  getTurmasByDocente() {
    this.turmaService.getTurmaByIdDocente(this.idDocente).then((turmas: Turma[]) => {
      this.turmas = turmas;
    }).catch(err => {
      this.router.navigate(['/error-sessao']);
    });
  }

  async onSubmit(value) {
    this.agendar();
  }

  public agendar() {
    this.spinner.show();

    this.data.idAmbiente = this.formGroup.get('ambiente').value;
    this.data.idTurma = this.formGroup.get('turma').value;
    this.data.data = this.formGroup.get('data').value;
    this.data.horaInicio = this.formGroup.get('horaInicio').value + ":00";
    this.data.horaFim = this.formGroup.get('horaFim').value + ":00";
    this.data.situacao = "Criada";

    this.eventoService.salvarEvento(this.data).subscribe((result: any) => {
        this.spinner.hide();
        this.router.navigate(['../../docente/welcome'], { relativeTo: this.route });
        this.messageService.add({ key: 'toast', severity: 'success', summary: "Sucesso!" , detail: "Agendamento realizado!" });
    }, err => {
      this.spinner.hide();
      this.messageService.add({ key: 'toast', severity: 'error', summary: "Atenção!" , detail: "Ocorreu um erro inesperado." });
      this.formGroup.reset();
    })
    
  }

  goTurmas(){
    sessionStorage.setItem('idDocente', this.idDocente);
    this.router.navigate(['docente/turmas']);
  }

  goAulas(){
    sessionStorage.setItem('idDocente', this.idDocente);
    this.router.navigate(['docente/aulas']);
  }

}