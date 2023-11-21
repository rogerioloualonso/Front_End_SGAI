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
import { Turma } from 'src/app/models/turma.model';
import { DiscenteService } from 'src/app/services/discente.service';
import { TurmaService } from 'src/app/services/turma.service';

@Component({
  selector: 'app-turma',
  templateUrl: './turma.component.html',
  styleUrls: ['./turma.component.css'],
})
export class TurmaComponent implements OnInit {
  @Input() mensagem: string;
  formGroup: FormGroup;
  sessaoExpirou: boolean
  mensagemError: string;
  loadModal: boolean = false;

  role: any;
  turmas: any;

  constructor(
    protected router: Router,
    public route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    protected messageService: MessageService,
    private turmaService: TurmaService
  ) {

  }

  ngOnInit() {
    this.role = this.router.url;
    this.getDocentes();
  }

  getDocentes() {
    this.turmaService.getAllTurmas().then((turmas: Turma[]) => {
      this.turmas = turmas;
    }).catch(err => {
      this.router.navigate(['/error-sessao']);
    });
  }

  excluir(idTurma: any){
    this.turmaService.excluir(idTurma).subscribe((result: any) => {
      this.getDocentes();
      this.messageService.add({ key: 'toast', severity: 'success', summary: "Sucesso!" , detail: "Turma Excluída!" });
  }, err => {
    this.spinner.hide();
    this.messageService.add({ key: 'toast', severity: 'error', summary: "Atenção!" , detail: "Ocorreu um erro inesperado." });
    this.formGroup.reset();
  })
  }

  goAdicionar(){
    sessionStorage.setItem('idTurma', "0");
    this.router.navigate(['admin/turma/form']);
  }

  goEditar(idTurma: any, turma: any){
    sessionStorage.setItem('idTurma', idTurma);
    sessionStorage.setItem('turma', turma);
    this.router.navigate(['admin/turma/form']);
  }

  goAmbiente(){
    this.router.navigate(['admin/ambiente']);
  }

  goDiscente(){
    this.router.navigate(['admin/discente']);
  }

  goEvento(){
    this.router.navigate(['admin/evento']);
  }

  goDocente(){
    this.router.navigate(['admin/docente']);
  }

}