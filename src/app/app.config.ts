import { environment } from '../environments/environment';
declare var require: any;

export const AppConfig = {
    production: environment.production,
    api: environment.api,
    version: require('../../package.json').version
};
