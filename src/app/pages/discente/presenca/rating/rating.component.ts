import { ActivatedRoute, Router} from '@angular/router';
import { Component, Input, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})

export class RatingComponent implements OnInit {
  @Input() mensagem: string;
  formGroup: FormGroup;
  sessaoExpirou: boolean
  mensagemError: string;
  loadModal: boolean = false;

  role: any;
  idPresenca:any;

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
  }

  avaliar(rating: any) {
    sessionStorage.setItem('idPresenca', this.idPresenca);
    sessionStorage.setItem('rating', rating);
    this.router.navigate(['discente/aulas/rating/comentario']);
  }

}