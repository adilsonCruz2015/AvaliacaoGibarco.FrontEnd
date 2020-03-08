import { Usuario } from './usuario.model';

export interface Autenticacao {
    codigo?: string;
    token?: string;
    expiraEm?: string;
    usuario?: Usuario;
}