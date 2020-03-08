import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './navegacao/not-found/not-found.component';
import { AutenticacaoGuard } from './core/guards';

const rootRouterConfig: Routes = [
    { path: '', redirectTo: 'cliente', pathMatch: 'full'},
    {
        path: 'cliente',
              loadChildren: () => import('./pages/cliente/cliente.module')
              .then(m => m.ClienteModule),
              canLoad: [ AutenticacaoGuard ],
              canActivate: [ AutenticacaoGuard ]
    },
    {
        path: 'pais',
              loadChildren: () => import('./pages/pais/pais.module')
              .then(m => m.PaisModule),
              canLoad: [ AutenticacaoGuard ],
              canActivate: [ AutenticacaoGuard ]
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