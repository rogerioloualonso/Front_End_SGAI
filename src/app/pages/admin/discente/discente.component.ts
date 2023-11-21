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

@Component({
  selector: 'app-discente',
  templateUrl: './discente.component.html',
  styleUrls: ['./discente.component.css'],
})
export class DiscenteComponent implements OnInit {
  @Input() mensagem: string;
  formGroup: FormGroup;
  sessaoExpirou: boolean
  mensagemError: string;
  loadModal: boolean = false;

  role: any;
  idDiscente:any;
  discentes: any;

  constructor(
    protected router: Router,
    public route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    protected messageService: MessageService,
    private discenteService: DiscenteService
  ) {

  }

  ngOnInit() {
    this.role = this.router.url;
    this.getDiscetes();
  }

  getDiscetes() {
    this.discenteService.getAllDiscentes().then((discentes: Discente[]) => {
      this.discentes = discentes;
    }).catch(err => {
      this.router.navigate(['/error-sessao']);
    });
  }

  excluir(idAmbiente: any){
    this.discenteService.excluir(idAmbiente).subscribe((result: any) => {
      this.getDiscetes();
      this.messageService.add({ key: 'toast', severity: 'success', summary: "Sucesso!" , detail: "Discente Excluído!" });
  }, err => {
    this.spinner.hide();
    this.messageService.add({ key: 'toast', severity: 'error', summary: "Atenção!" , detail: "Ocorreu um erro inesperado." });
    this.formGroup.reset();
  })
  }

  goAdicionar(){
    sessionStorage.setItem('idDiscente', "0");
    this.router.navigate(['admin/discente/form']);
  }

  goEditar(idDiscente: any, docente: any){
    sessionStorage.setItem('idDiscente', idDiscente);
    sessionStorage.setItem('discente', docente);
    this.router.navigate(['admin/discente/form']);
  }

  goAmbiente(){
    this.router.navigate(['admin/ambiente']);
  }

  goDocente(){
    this.router.navigate(['admin/docente']);
  }

}