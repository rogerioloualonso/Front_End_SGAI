import { ActivatedRoute, Router} from '@angular/router';
import { Component, Input, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { Docente } from 'src/app/models/docente.model';
import { DocenteService } from 'src/app/services/docente.service';

@Component({
  selector: 'app-formdocente',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormDocenteComponent implements OnInit {
  @Input() mensagem: string;
  formGroup: FormGroup;

  role: any;
  idDocente:any;
  ambientes: any;
  turmas: any;
  docente: any;

  data: Docente = {
    nome: "",
    cpf: "",
    telefone:"",
    matricula:"",
    senha:""
  }

  constructor(
    protected router: Router,
    public route: ActivatedRoute,
    private frmBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    protected messageService: MessageService,
    private docenteService: DocenteService
  ) {

  }

  ngOnInit() {
    this.role = this.router.url;
    this.idDocente = sessionStorage.getItem("idDocente");

    if(this.idDocente > 0) {
      this.getDocente(this.idDocente);
    }

    this.formGroup = this.frmBuilder.group({
      'nome': ['', [Validators.required]],
      'cpf': ['', [Validators.required]],
      'matricula': ['', [Validators.required]],
      'telefone': ['', [Validators.required]],
      'senha': ['', ]
    });
  }

  async onSubmit(value) {
    if(this.idDocente == 0){
      this.salvar();
    }
  }

  getDocente(id:any) {
    this.docenteService.getDocenteById(id).then((docente: Docente) => {
      this.docente = docente;

      this.formGroup.patchValue({
        nome: docente.nome,
        cpf: docente.cpf,
        telefone: docente.telefone,
        matricula: docente.matricula
      });
    }).catch(err => {
      this.router.navigate(['/error-sessao']);
    });
  }

  public salvar() {
    this.spinner.show();

    this.data.nome = this.formGroup.get('nome').value;
    this.data.cpf = this.formGroup.get('cpf').value;
    this.data.telefone = this.formGroup.get('telefone').value;
    this.data.matricula = this.formGroup.get('matricula').value;
    this.data.senha = this.formGroup.get('senha').value;;

    this.docenteService.salvarDocente(this.data).subscribe((result: any) => {
        this.spinner.hide();
        this.router.navigate(['../../docente'], { relativeTo: this.route });
        this.messageService.add({ key: 'toast', severity: 'success', summary: "Sucesso!" , detail: "Docente cadastrado!" });
    }, err => {
      this.spinner.hide();
      this.messageService.add({ key: 'toast', severity: 'error', summary: "Atenção!" , detail: "Ocorreu um erro inesperado." });
      this.formGroup.reset();
    })
    
  }

  public atualizar() {
    this.spinner.show();

    this.data.nome = this.formGroup.get('nome').value;
    this.data.cpf = this.formGroup.get('cpf').value;
    this.data.telefone = this.formGroup.get('telefone').value;
    this.data.matricula = this.formGroup.get('matricula').value;
    this.data.createdAt = this.docente.createdAt;
    this.data.id = this.docente.id;

    this.docenteService.atualizarDocente(this.data).subscribe((result: any) => {
        this.spinner.hide();
        this.router.navigate(['../../docente'], { relativeTo: this.route });
        this.messageService.add({ key: 'toast', severity: 'success', summary: "Sucesso!" , detail: "Docente atualizado!" });
    }, err => {
      this.spinner.hide();
      this.messageService.add({ key: 'toast', severity: 'error', summary: "Atenção!" , detail: "Ocorreu um erro inesperado." });
      this.formGroup.reset();
    })
    
  }

  voltar(){
    this.router.navigate(['admin/docente']);
  }

}