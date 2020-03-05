import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './navegacao/not-found/not-found.component';

const rootRouterConfig: Routes = [
    { path: '', redirectTo: 'autenticacao', pathMatch: 'full'},

    { path: 'autenticacao',
            loadChildren: () => import('./pages/autenticacao/autenticacao.module')
            .then(m => m.AutenticacaoModule)},
    {
        path: 'cliente',
              loadChildren: () => import('./pages/cliente/cliente.module')
              .then(m => m.ClienteModule)
    },
    {
        path: 'pais',
              loadChildren: () => import('./pages/pais/pais.module')
              .then(m => m.PaisModule)
    },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
   imports: [
       RouterModule.forRoot(rootRouterConfig)
   ],
   exports: [
       RouterModule
   ]
})
export class AppRoutingModule { }