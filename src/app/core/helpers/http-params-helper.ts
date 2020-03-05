import { HttpParams } from '@angular/common/http';

/** Possui métodos que facilitam a manipulação da classe HttpParams */
export class HttpParamsHelper {

    /**
     * Facilita a atribuição de valores ao HttpParams, detectando valores como Array e fazendo atribuição de acordo
     * @param out informe o objeto que será populados com os dados
     * @param key informe a chave que será atribuída
     * @param value  informe o valor que será atribuído
     */
    static setItem(out: HttpParams, key: string, value: any): HttpParams {
        if (value !== undefined && value !== null) {
            if (value instanceof Array) {
                value.forEach(element => {
                    out = HttpParamsHelper.setItem(out, key, element);
                });
            } else {
                out = out.append(key, value);
            }
        }
        return out;
    }

    /**
     * Facilita a maneira de popular um HttpParams a partir de um objeto
     * @param out informe o objeto que será populados com os dados
     * @param params informe o objeto de onde os dados serão extraidos
     * @param prefix um prefixo que seria aplicado a todos os parametros que forem criados
     */
    static setObject(out: HttpParams, params: object, prefix: string = ''): HttpParams {
        let value = null;
        if (params !== undefined && params !== null) {
            Object.keys(params).forEach(function (key) {
                value = params[key];
                if (value instanceof Object && !(value instanceof File) && !(value instanceof Array)) {
                    out = HttpParamsHelper.setObject(out, value, `${prefix}${key}.`);
                } else {
                    out = HttpParamsHelper.setItem(out, `${prefix}${key}`, value);
                }
            });
        }
        return out;
    }
}
