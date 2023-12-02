import { ActivatedRoute, Router} from '@angular/router';
import { Component, Input, OnInit} from '@angular/core';
import { FormGroup} from '@angular/forms';

import { MessageService } from 'primeng/api';
import { PresencaService } from 'src/app/services/presenca.service';
import { Presenca } from 'src/app/models/Presenca.model';

@Component({
  selector: 'app-presenca',
  templateUrl: './presenca.component.html',
  styleUrls: ['./presenca.component.css'],
})
export class PresencaComponent implements OnInit {
  @Input() mensagem: string;
  formGroup: FormGroup;
  sessaoExpirou: boolean
  mensagemError: string;
  loadModal: boolean = false;

  role: any;
  idDocente:any;
  idAula:any;
  turmas: any;
  presencas: any;

  constructor(
    protected router: Router,
    public route: ActivatedRoute,
    
    protected messageService: MessageService,
    private presencaService: PresencaService
  ) {

  }

  ngOnInit() {
    this.role = this.router.url;
    this.idDocente = sessionStorage.getItem("idDocente");
    this.idAula = sessionStorage.getItem("idAula");

    this.getPresencas(this.idAula);
  }

  getPresencas(idAula: any) {
    this.presencaService.getPresencaByIdEvento(idAula).then((presencas: Presenca[]) => {
      this.presencas = presencas;
    }).catch(err => {
      this.router.navigate(['/error-sessao']);
    });
  }

  excluirPresenca(idAula: any){
    this.presencaService.excluirPresenca(idAula).subscribe((result: any) => {
      //this.router.navigate(['../../docente/welcome'], { relativeTo: this.route });
      this.getPresencas(this.idAula);
      this.messageService.add({ key: 'toast', severity: 'success', summary: "Sucesso!" , detail: "Presença excluida!" });
  }, err => {
    this.messageService.add({ key: 'toast', severity: 'error', summary: "Atenção!" , detail: "Ocorreu um erro inesperado." });
    this.formGroup.reset();
  })
  }

  goAgendar(){
    sessionStorage.setItem('idDocente', this.idDocente);
    this.router.navigate(['docente/agendar']);
  }

  goAulas(){
    sessionStorage.setItem('idDocente', this.idDocente);
    this.router.navigate(['docente/aulas']);
  }

  goTurmas(){
    sessionStorage.setItem('idDocente', this.idDocente);
    this.router.navigate(['docente/turmas']);
  }

}