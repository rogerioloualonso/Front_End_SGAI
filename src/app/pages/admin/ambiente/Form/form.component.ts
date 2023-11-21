import { ActivatedRoute, Router} from '@angular/router';
import { Component, Input, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { AmbienteService } from 'src/app/services/ambiente.service';
import { Ambiente } from 'src/app/models/ambiente.model';

@Component({
  selector: 'app-formambiente',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormAmbienteComponent implements OnInit {
  @Input() mensagem: string;
  formGroup: FormGroup;

  role: any;
  idAmbiente:any;
  ambientes: any;
  turmas: any;
  ambiente: any;

  data: Ambiente = {
    nome: "",
    descricao: "",
    capacidade:"",
    tipo:"",
    situacao:""
  }

  constructor(
    protected router: Router,
    public route: ActivatedRoute,
    private frmBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    protected messageService: MessageService,
    private ambienteService: AmbienteService
  ) {

  }

  ngOnInit() {
    this.role = this.router.url;
    this.idAmbiente = sessionStorage.getItem("idAmbiente");

    if(this.idAmbiente > 0) {
      this.getAmbiente(this.idAmbiente);
    }

    this.formGroup = this.frmBuilder.group({
      'nome': ['', [Validators.required]],
      'descricao': ['', [Validators.required]],
      'capacidade': ['', [Validators.required]],
      'tipo': ['', [Validators.required]]
    });
  }

  async onSubmit(value) {
    if(this.idAmbiente == 0){
      this.salvar();
    }
  }

  getAmbiente(id:any) {
    this.ambienteService.getAmbiente(id).then((ambiente: Ambiente) => {
      this.ambiente = ambiente;

      this.formGroup.patchValue({
        nome: ambiente.nome,
        descricao: ambiente.descricao,
        capacidade: ambiente.capacidade,
        tipo: ambiente.tipo,
      });
    }).catch(err => {
      this.router.navigate(['/error-sessao']);
    });
  }

  public salvar() {
    this.spinner.show();

    this.data.nome = this.formGroup.get('nome').value;
    this.data.descricao = this.formGroup.get('descricao').value;
    this.data.capacidade = this.formGroup.get('capacidade').value;
    this.data.tipo = this.formGroup.get('tipo').value;
    this.data.situacao = "Ativa";

    this.ambienteService.salvarAmbiente(this.data).subscribe((result: any) => {
        this.spinner.hide();
        this.router.navigate(['../../ambiente'], { relativeTo: this.route });
        this.messageService.add({ key: 'toast', severity: 'success', summary: "Sucesso!" , detail: "Ambiente cadastrado!" });
    }, err => {
      this.spinner.hide();
      this.messageService.add({ key: 'toast', severity: 'error', summary: "Atenção!" , detail: "Ocorreu um erro inesperado." });
      this.formGroup.reset();
    })
    
  }

  public atualizar() {
    this.spinner.show();

    this.data.nome = this.formGroup.get('nome').value;
    this.data.descricao = this.formGroup.get('descricao').value;
    this.data.capacidade = this.formGroup.get('capacidade').value;
    this.data.tipo = this.formGroup.get('tipo').value;
    this.data.situacao = "Ativa";
    this.data.createdAt = this.ambiente.createdAt;
    this.data.id = this.ambiente.id;

    this.ambienteService.atualizarAmbiente(this.data).subscribe((result: any) => {
        this.spinner.hide();
        this.router.navigate(['../../ambiente'], { relativeTo: this.route });
        this.messageService.add({ key: 'toast', severity: 'success', summary: "Sucesso!" , detail: "Ambiente atualizado!" });
    }, err => {
      this.spinner.hide();
      this.messageService.add({ key: 'toast', severity: 'error', summary: "Atenção!" , detail: "Ocorreu um erro inesperado." });
      this.formGroup.reset();
    })
    
  }

  voltar(){
    this.router.navigate(['admin/ambiente']);
  }

}