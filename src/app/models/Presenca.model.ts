import { Docente } from "./docente.model";

export class Presenca {

    constructor(
        public id?: number,
        public nomeDiscente?: string,
        public matricula?: string,
        public inicio?: string,
        public fim?: Docente,
        public situacao?: Docente,
    ) { }


}