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
  { path: 'Login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'bienvenido', loadChildren: './bienvenido/bienvenido.module#BienvenidoPageModule' },
  { path: 'search-wifi', loadChildren: './search-wifi/search-wifi.module#SearchWifiPageModule' },
  { path: 'mapa/:cont', loadChildren: './mapa/mapa.module#MapaPageModule' },
  { path: 'perfil', loadChildren: './perfil/perfil.module#PerfilPageModule' },
  { path: 'estadistica', loadChildren: './estadistica/estadistica.module#EstadisticaPageModule' },
  { path: 'misredes', loadChildren: './misredes/misredes.module#MisredesPageModule' },  { path: 'buscarredes', loadChildren: './buscarredes/buscarredes.module#BuscarredesPageModule' }




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
