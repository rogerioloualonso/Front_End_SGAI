import { ActivatedRoute, Router} from '@angular/router';
import { Component, Input, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { DiscenteService } from 'src/app/services/discente.service';
import { Discente } from 'src/app/models/discente.model';
import { TurmaService } from 'src/app/services/turma.service';

@Component({
  selector: 'app-listadiscente',
  templateUrl: './listaDiscente.component.html',
  styleUrls: ['./listaDiscente.component.css'],
})
export class listaDiscenteComponent implements OnInit {
  @Input() mensagem: string;
  formGroup: FormGroup;
  sessaoExpirou: boolean
  mensagemError: string;
  loadModal: boolean = false;

  role: any;
  idDiscente:any;
  idTurma: any;
  discentes: any;

  constructor(
    protected router: Router,
    public route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    protected messageService: MessageService,
    private discenteService: DiscenteService,
    private turmaService: TurmaService,
  ) {

  }

  ngOnInit() {
    this.role = this.router.url;
    this.idTurma = sessionStorage.getItem("idTurma");
    this.getDiscentesTurma(this.idTurma);
  }

  getDiscentesTurma(idTurma: any) {
    this.discenteService.getDiscenteByTurma(idTurma).then((discentes: Discente[]) => {
      this.discentes = discentes;
    }).catch(err => {
      this.router.navigate(['/error-sessao']);
    });
  }

  excluir(discente: Discente){
    discente.idTurma = this.idTurma;
    this.turmaService.removerDiscenteTurma(discente).subscribe((result: any) => {
      this.getDiscentesTurma(this.idTurma);
      this.messageService.add({ key: 'toast', severity: 'success', summary: "Sucesso!" , detail: "Discente removido da Turma!" });
  }, err => {
    this.spinner.hide();
    this.messageService.add({ key: 'toast', severity: 'error', summary: "Atenção!" , detail: "Ocorreu um erro inesperado." });
    this.formGroup.reset();
  })
  }

  goAdicionar(){
    sessionStorage.setItem('idTurma', this.idTurma);
    this.router.navigate(['admin/turma/discentes/adicionar']);
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