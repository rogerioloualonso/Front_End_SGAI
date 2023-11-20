import { ActivatedRoute, Router} from '@angular/router';
import { Component, Input, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-welcomeadmin',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeAdminComponent implements OnInit {
  @Input() mensagem: string;
  formGroup: FormGroup;
  sessaoExpirou: boolean
  mensagemError: string;
  loadModal: boolean = false;

  role: any;
  cpf:any;
  discente:any;

  constructor(
    protected router: Router,
    public route: ActivatedRoute,
    protected messageService: MessageService
  ) {

  }

  ngOnInit() {
    this.role = this.router.url;
  }

  goTurmas(){
    sessionStorage.setItem('idDiscente', this.discente.id);
    this.router.navigate(['discente/turmas']);
  }

}