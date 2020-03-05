import { Pais } from './pais.model';

export interface Cliente {
    codigo?: string;
    cnpj?: string;
    razaoSocial?: string;
    pais?: Pais;
}
