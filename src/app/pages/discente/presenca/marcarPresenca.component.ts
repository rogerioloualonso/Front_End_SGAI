import { ActivatedRoute, Router} from '@angular/router';
import { Component, Input, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { Aula } from 'src/app/models/aula.model';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-marcarpresenca',
  templateUrl: './marcarpresenca.component.html',
  styleUrls: ['./marcarpresenca.component.css'],
})
export class MarcarPresencaComponent implements OnInit {
  @Input() mensagem: string;
  formGroup: FormGroup;
  sessaoExpirou: boolean
  mensagemError: string;
  loadModal: boolean = false;

  role: any;
  idDiscente:any;
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
    this.idDiscente = sessionStorage.getItem("idDiscente");
    console.log(this.idDiscente);
    this.getAulasDiscente(this.idDiscente);
  }

  getAulasDiscente(idDocente: any) {
    this.eventoService.getEventoByDiscente(idDocente).then((aulas: Aula[]) => {
      this.aulas = aulas;
    }).catch(err => {
      this.router.navigate(['/error-sessao']);
    });
  }

  goTurmas(){
    sessionStorage.setItem('idDocente', this.idDiscente);
    this.router.navigate(['discente/turmas']);
  }

  entrada(idEvento: any){
    this.eventoService.marcarEntrada(idEvento, this.idDiscente).subscribe((result: any) => {
      this.getAulasDiscente(this.idDiscente);
      this.messageService.add({ key: 'toast', severity: 'success', summary: "Sucesso!" , detail: "Entrada inserida!" });
  }, err => {
    this.spinner.hide();
    this.messageService.add({ key: 'toast', severity: 'error', summary: "Atenção!" , detail: "Ocorreu um erro inesperado." });
    this.formGroup.reset();
  })
  }

  goAvaliacao(idPresenca: any){
    sessionStorage.setItem('idPresenca', idPresenca);
    this.router.navigate(['discente/aulas/rating']);
  }

}