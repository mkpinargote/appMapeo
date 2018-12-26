import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'bienvenido',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'principal', loadChildren: './principal/principal.module#PrincipalPageModule' },
  { path: 'DetectarRedes', loadChildren: './detectar-redes/detectar-redes.module#DetectarRedesPageModule' },
  { path: 'Login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'bienvenido', loadChildren: './bienvenido/bienvenido.module#BienvenidoPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
