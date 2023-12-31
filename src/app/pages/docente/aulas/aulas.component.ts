import { ActivatedRoute, Router} from '@angular/router';
import { Component, Input, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { Aula } from 'src/app/models/aula.model';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-aulas',
  templateUrl: './aulas.component.html',
  styleUrls: ['./aulas.component.css'],
})
export class AulasComponent implements OnInit {
  @Input() mensagem: string;
  formGroup: FormGroup;
  sessaoExpirou: boolean
  mensagemError: string;
  loadModal: boolean = false;

  role: any;
  idDocente:any;
  aulas: any;

  constructor(
    protected router: Router,
    public route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    protected messageService: MessageService,
    private eventoService: EventoService
  ) {

  }

  ngOnInit() {
    this.role = this.router.url;
    this.idDocente = sessionStorage.getItem("idDocente");
    console.log(this.idDocente);
    this.getAulasDocente(this.idDocente);
  }

  getAulasDocente(idDocente: any) {
    this.eventoService.getEventoByDocente(idDocente).then((aulas: Aula[]) => {
      this.aulas = aulas;
    }).catch(err => {
      this.router.navigate(['/error-sessao']);
    });
  }

  goAgendar(){
    sessionStorage.setItem('idDocente', this.idDocente);
    this.router.navigate(['docente/agendar']);
  }

  goTurmas(){
    sessionStorage.setItem('idDocente', this.idDocente);
    this.router.navigate(['docente/turmas']);
  }

  goPresenca(idAula: any){
    sessionStorage.setItem('idAula', idAula);
    this.router.navigate(['docente/aulas/presenca']);
  }

  iniciarAula(idEvento: any){
    this.eventoService.iniciarEvento(idEvento).subscribe((result: any) => {
      this.getAulasDocente(this.idDocente);
      this.messageService.add({ key: 'toast', severity: 'success', summary: "Sucesso!" , detail: "Evento Iniciado!" });
  }, err => {
    this.spinner.hide();
    this.messageService.add({ key: 'toast', severity: 'error', summary: "Atenção!" , detail: "Ocorreu um erro inesperado." });
    this.formGroup.reset();
  })
  }

  finalizarAula(idEvento: any){
    this.eventoService.finalizarEvento(idEvento).subscribe((result: any) => {
      this.getAulasDocente(this.idDocente);
      this.messageService.add({ key: 'toast', severity: 'success', summary: "Sucesso!" , detail: "Evento Finalizado!" });
  }, err => {
    this.spinner.hide();
    this.messageService.add({ key: 'toast', severity: 'error', summary: "Atenção!" , detail: "Ocorreu um erro inesperado." });
    this.formGroup.reset();
  })
  }

  excluirAula(idEvento: any){
    this.eventoService.excluirEvento(idEvento).subscribe((result: any) => {
      this.getAulasDocente(this.idDocente);
      this.messageService.add({ key: 'toast', severity: 'success', summary: "Sucesso!" , detail: "Evento Excluído!" });
  }, err => {
    this.spinner.hide();
    this.messageService.add({ key: 'toast', severity: 'error', summary: "Atenção!" , detail: "Ocorreu um erro inesperado." });
    this.formGroup.reset();
  })
  }

}