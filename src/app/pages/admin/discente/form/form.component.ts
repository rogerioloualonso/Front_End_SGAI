import { ActivatedRoute, Router} from '@angular/router';
import { Component, Input, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { Docente } from 'src/app/models/docente.model';
import { Discente } from 'src/app/models/discente.model';
import { DiscenteService } from 'src/app/services/discente.service';

@Component({
  selector: 'app-formdiscente',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormDiscenteComponent implements OnInit {
  @Input() mensagem: string;
  formGroup: FormGroup;

  role: any;
  idDiscente:any;
  ambientes: any;
  turmas: any;
  docente: any;

  data: Discente = {
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
    private discenteService: DiscenteService
  ) {

  }

  ngOnInit() {
    this.role = this.router.url;
    this.idDiscente = sessionStorage.getItem("idDiscente");

    if(this.idDiscente > 0) {
      this.getDocente(this.idDiscente);
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
    if(this.idDiscente == 0){
      this.salvar();
    }
  }

  getDocente(id:any) {
    this.discenteService.getDiscenteById(id).then((docente: Docente) => {
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

    this.discenteService.salvarDiscente(this.data).subscribe((result: any) => {
        this.spinner.hide();
        this.router.navigate(['../../discente'], { relativeTo: this.route });
        this.messageService.add({ key: 'toast', severity: 'success', summary: "Sucesso!" , detail: "Discente cadastrado!" });
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

    this.discenteService.atualizarDiscente(this.data).subscribe((result: any) => {
        this.spinner.hide();
        this.router.navigate(['../../discente'], { relativeTo: this.route });
        this.messageService.add({ key: 'toast', severity: 'success', summary: "Sucesso!" , detail: "Discente atualizado!" });
    }, err => {
      this.spinner.hide();
      this.messageService.add({ key: 'toast', severity: 'error', summary: "Atenção!" , detail: "Ocorreu um erro inesperado." });
      this.formGroup.reset();
    })
    
  }

  voltar(){
    this.router.navigate(['admin/discente']);
  }

}