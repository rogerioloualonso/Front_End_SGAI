import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class SharedUtil {

    constructor(
        protected messageService: MessageService
    ) { }

    success = 'success';
    info = 'info';
    warn = 'warn';
    error = 'error';

    public getMessage(chave: string, sticky: boolean, tipo: string, titulo: string, menssage: string) {
        this.messageService.add({ key: chave, sticky: sticky, severity: tipo, summary: titulo, detail: menssage });
    }


}

