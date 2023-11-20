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

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.css'],
})
export class DocenteComponent implements OnInit {
  @Input() mensagem: string;
  formGroup: FormGroup;
  sessaoExpirou: boolean
  mensagemError: string;
  loadModal: boolean = false;

  role: any;
  idDiscente:any;
  docentes: any;

  constructor(
    protected router: Router,
    public route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    protected messageService: MessageService,
    private docenteService: DocenteService
  ) {

  }

  ngOnInit() {
    this.role = this.router.url;
    this.getDocentes();
  }

  getDocentes() {
    this.docenteService.getAllDocentes().then((docentes: Docente[]) => {
      this.docentes = docentes;
    }).catch(err => {
      this.router.navigate(['/error-sessao']);
    });
  }

  excluir(idAmbiente: any){
    this.docenteService.excluir(idAmbiente).subscribe((result: any) => {
      this.getDocentes();
      this.messageService.add({ key: 'toast', severity: 'success', summary: "Sucesso!" , detail: "Docente Excluído!" });
  }, err => {
    this.spinner.hide();
    this.messageService.add({ key: 'toast', severity: 'error', summary: "Atenção!" , detail: "Ocorreu um erro inesperado." });
    this.formGroup.reset();
  })
  }

  goAdicionar(){
    sessionStorage.setItem('idDocente', "0");
    this.router.navigate(['admin/docente/form']);
  }

  goEditar(idDocente: any, docente: any){
    sessionStorage.setItem('idDocente', idDocente);
    sessionStorage.setItem('docente', docente);
    this.router.navigate(['admin/docente/form']);
  }

  goAmbiente(){
    this.router.navigate(['admin/ambiente']);
  }

}