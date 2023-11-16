import { Time } from "@angular/common";

export class Relatorio {

    constructor(
        public data?: Date,
        public local?: string,
        public horario?: Time,
        public cpf?: string,
        public nome?: string,
        public email?: string
    ) { }


}