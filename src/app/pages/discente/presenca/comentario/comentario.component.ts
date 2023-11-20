import { ActivatedRoute, Router} from '@angular/router';
import { Component, Input, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventoService } from 'src/app/services/evento.service';
import { MarcarPresenca } from 'src/app/models/marcarPresenca.model';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.css'],
})

export class ComentarioComponent implements OnInit {
  @Input() mensagem: string;
  formGroup: FormGroup;
  sessaoExpirou: boolean
  mensagemError: string;
  loadModal: boolean = false;

  role: any;
  idPresenca:any;
  rating: any;
  comentario: any;

  data: MarcarPresenca = {
    idPresenca: 0,
    comentario: "",
    rating: 0,
  }

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
    this.idPresenca = sessionStorage.getItem("idPresenca");
    this.rating = sessionStorage.getItem("rating");
  }

  public salvar() {

    this.data.comentario = this.comentario;
    this.data.rating = this.rating;
    this.data.idPresenca = this.idPresenca;

    this.eventoService.marcarSaida(this.data).subscribe((result: any) => {
        this.router.navigate(['../../../welcome'], { relativeTo: this.route });
        this.messageService.add({ key: 'toast', severity: 'success', summary: "Sucesso!" , detail: "Marcação realizada!" });
    }, err => {
      this.spinner.hide();
      this.messageService.add({ key: 'toast', severity: 'error', summary: "Atenção!" , detail: "Ocorreu um erro inesperado." });
      this.formGroup.reset();
    })
    
  }

}