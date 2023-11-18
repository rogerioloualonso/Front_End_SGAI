import { Ambiente } from "./ambiente.model";

export class Aula {

    constructor(
        public id?: number,
        public ambiente?: Ambiente,
        public data?: Date,
        public horaInicio?: string,
        public horaFim?: string,
        public situacao?: string
    ) { }


}