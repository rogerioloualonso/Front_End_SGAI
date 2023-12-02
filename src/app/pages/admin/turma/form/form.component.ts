import { ActivatedRoute, Router} from '@angular/router';
import { Component, Input, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { Turma } from 'src/app/models/turma.model';
import { TurmaService } from 'src/app/services/turma.service';
import { Docente } from 'src/app/models/docente.model';
import { DocenteService } from 'src/app/services/docente.service';

@Component({
  selector: 'app-formturma',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormTurmaComponent implements OnInit {
  @Input() mensagem: string;
  formGroup: FormGroup;

  role: any;
  idTurma:any;
  ambientes: any;
  turma: any;
  docentes: any;

  data: Turma = {
    nome: "",
    turno: "",
    idDocente: 0,
    situacao:""
  }

  constructor(
    protected router: Router,
    public route: ActivatedRoute,
    private frmBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    protected messageService: MessageService,
    private docenteService: DocenteService,
    private turmaService: TurmaService,
  ) {

  }

  ngOnInit() {
    this.role = this.router.url;
    this.idTurma = sessionStorage.getItem("idTurma");
    this.getDocentes()

    if(this.idTurma > 0) {
      this.getTurma(this.idTurma);
    }

    this.formGroup = this.frmBuilder.group({
      'nome': ['', [Validators.required]],
      'turno': ['', [Validators.required]],
      'docente': ['', [Validators.required]]
    });
  }

  async onSubmit(value) {
    if(this.idTurma == 0){
      this.salvar();
    }
  }

  getDocentes() {
    this.docenteService.getAllDocentes().then((docentes: Docente[]) => {
      this.docentes = docentes;
    }).catch(err => {
      this.router.navigate(['/error-sessao']);
    });
  }

  getTurma(id:any) {
    this.turmaService.getTurmaById(id).then((turma: Turma) => {
      this.turma = turma;

      this.formGroup.patchValue({
        nome: turma.nome,
        turno: turma.turno,
        docente: turma.idDocente
      });
    }).catch(err => {
      this.router.navigate(['/error-sessao']);
    });
  }

  public salvar() {
    this.spinner.show();

    this.data.nome = this.formGroup.get('nome').value;
    this.data.turno = this.formGroup.get('turno').value;
    this.data.idDocente = this.formGroup.get('docente').value;
    this.data.situacao = "ATIVA";

    this.turmaService.salvarTurma(this.data).subscribe((result: any) => {
        this.spinner.hide();
        this.router.navigate(['../../turma'], { relativeTo: this.route });
        this.messageService.add({ key: 'toast', severity: 'success', summary: "Sucesso!" , detail: "Turma cadastrada!" });
    }, err => {
      this.spinner.hide();
      this.messageService.add({ key: 'toast', severity: 'error', summary: "Atenção!" , detail: "Ocorreu um erro inesperado." });
      this.formGroup.reset();
    })
    
  }

  public atualizar() {
    this.spinner.show();

    this.data.nome = this.formGroup.get('nome').value;
    this.data.turno = this.formGroup.get('turno').value;
    this.data.situacao = this.turma.situacao;
    this.data.idDocente = this.formGroup.get('docente').value;
    this.data.createdAt = this.turma.createdAt;
    this.data.id = this.turma.id;

    this.turmaService.atualizarTurma(this.data).subscribe((result: any) => {
        this.spinner.hide();
        this.router.navigate(['../../turma'], { relativeTo: this.route });
        this.messageService.add({ key: 'toast', severity: 'success', summary: "Sucesso!" , detail: "Turma atualizada!" });
    }, err => {
      this.spinner.hide();
      this.messageService.add({ key: 'toast', severity: 'error', summary: "Atenção!" , detail: "Ocorreu um erro inesperado." });
      this.formGroup.reset();
    })
    
  }

  voltar(){
    this.router.navigate(['admin/turma']);
  }

}