import { ConfirmationService, MessageService } from 'primeng/api';
import { saveAs } from 'file-saver';
import { Workbook, Worksheet } from 'exceljs';


export class Utils {

    public messageService: MessageService;

    public formatacaoDeData(data: string){
      let arr = data.split("/");
      let dia = arr[0];
      let mes = arr[1];
      let ano = arr[2];
      let dataFormatada = `${ano}-${mes}-${dia}`;
      return dataFormatada;
    }
    
}
