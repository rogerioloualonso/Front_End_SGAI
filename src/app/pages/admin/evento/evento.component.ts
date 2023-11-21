import { ActivatedRoute, Router} from '@angular/router';
import { Component, Input, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { Aula } from 'src/app/models/aula.model';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css'],
})
export class EventoComponent implements OnInit {
  @Input() mensagem: string;
  formGroup: FormGroup;
  sessaoExpirou: boolean
  mensagemError: string;
  loadModal: boolean = false;

  role: any;
  idDocente:any;
  eventos: any;

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
    this.getAllEventos();
  }

  getAllEventos() {
    this.eventoService.getAllEventos().then((eventos: Aula[]) => {
      this.eventos = eventos;
    }).catch(err => {
      this.router.navigate(['/error-sessao']);
    });
  }

  aprovarEvento(idEvento: any){
    this.eventoService.aprovarEvento(idEvento).subscribe((result: any) => {
      this.getAllEventos();
      this.messageService.add({ key: 'toast', severity: 'success', summary: "Sucesso!" , detail: "Evento Aprovado!" });
  }, err => {
    this.spinner.hide();
    this.messageService.add({ key: 'toast', severity: 'error', summary: "Atenção!" , detail: "Ocorreu um erro inesperado." });
    this.formGroup.reset();
  })
  }

  reprovarEvento(idEvento: any){
    this.eventoService.reprovarEvento(idEvento).subscribe((result: any) => {
      this.getAllEventos();
      this.messageService.add({ key: 'toast', severity: 'warn', summary: "Sucesso!" , detail: "Evento Reprovado!" });
  }, err => {
    this.spinner.hide();
    this.messageService.add({ key: 'toast', severity: 'error', summary: "Atenção!" , detail: "Ocorreu um erro inesperado." });
    this.formGroup.reset();
  })
  }

  excluirEvento(idEvento: any){
    this.eventoService.excluirEvento(idEvento).subscribe((result: any) => {
      this.getAllEventos();
      this.messageService.add({ key: 'toast', severity: 'success', summary: "Sucesso!" , detail: "Evento Excluído!" });
  }, err => {
    this.spinner.hide();
    this.messageService.add({ key: 'toast', severity: 'error', summary: "Atenção!" , detail: "Ocorreu um erro inesperado." });
    this.formGroup.reset();
  })
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

  goAvaliacao(idEvento: any){
    sessionStorage.setItem('idEvento', idEvento);
    this.router.navigate(['admin/evento/avaliacao']);
  }


}