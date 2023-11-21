import { Docente } from "./docente.model";

export class Turma {

    constructor(
        public id?: number,
        public idDocente?: number,
        public nome?: string,
        public turno?: string,
        public situacao?: string,
        public docente?: Docente,
        public createdAt?: string,
    ) { }


}