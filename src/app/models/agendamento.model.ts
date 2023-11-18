import { Time } from "@angular/common";

export class Agendamento {

    constructor(
        public idAmbiente?: String,
        public idTurma?: String,
        public data?: String,
        public horaInicio?: String,
        public horaFim?: String,
        public situacao?: String
    ) { }


}