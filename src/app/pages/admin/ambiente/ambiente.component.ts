import { ActivatedRoute, Router} from '@angular/router';
import { Component, Input, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { AmbienteService } from 'src/app/services/ambiente.service';
import { Ambiente } from 'src/app/models/ambiente.model';

@Component({
  selector: 'app-ambiente',
  templateUrl: './ambiente.component.html',
  styleUrls: ['./ambiente.component.css'],
})
export class AmbienteComponent implements OnInit {
  @Input() mensagem: string;
  formGroup: FormGroup;
  sessaoExpirou: boolean
  mensagemError: string;
  loadModal: boolean = false;

  role: any;
  idDiscente:any;
  ambientes: any;

  constructor(
    protected router: Router,
    public route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    protected messageService: MessageService,
    private ambienteService: AmbienteService
  ) {

  }

  ngOnInit() {
    this.role = this.router.url;
    this.getAmbientes();
  }

  getAmbientes() {
    this.ambienteService.getAmbientes().then((ambientes: Ambiente[]) => {
      this.ambientes = ambientes;
    }).catch(err => {
      this.router.navigate(['/error-sessao']);
    });
  }

  excluir(idAmbiente: any){
    this.ambienteService.excluir(idAmbiente).subscribe((result: any) => {
      this.getAmbientes();
      this.messageService.add({ key: 'toast', severity: 'success', summary: "Sucesso!" , detail: "Ambiente Excluído!" });
  }, err => {
    this.spinner.hide();
    this.messageService.add({ key: 'toast', severity: 'error', summary: "Atenção!" , detail: "Ocorreu um erro inesperado." });
    this.formGroup.reset();
  })
  }

  goAdicionar(){
    sessionStorage.setItem('idAmbiente', "0");
    this.router.navigate(['admin/ambiente/form']);
  }

  goEditar(idAmbiente: any, ambiente: any){
    sessionStorage.setItem('idAmbiente', idAmbiente);
    sessionStorage.setItem('ambiente', ambiente);
    this.router.navigate(['admin/ambiente/form']);
  }

  goDocente(){
    this.router.navigate(['admin/docente']);
  }

  goDiscente(){
    this.router.navigate(['admin/discente']);
  }

  goTurma(){
    this.router.navigate(['admin/turma']);
  }

  goEvento(){
    this.router.navigate(['admin/evento']);
  }

}