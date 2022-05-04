import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { DefaultAdminComponent } from './components/default-admin/default-admin.component';
import { DefaultRouterComponent } from './components/default-router/default-router.component';
import { EditarPerfilComponent } from './components/editar-perfil/editar-perfil.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { InformacionSucursalesComponent } from './components/informacion-sucursales/informacion-sucursales.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { ProductosEmpresasComponent } from './components/productos-empresas/productos-empresas.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AdminGuard } from './services/admin.guard';
import { UsuarioGuard } from './services/usuarios.guard';

const routes: Routes = [
  {path: '', redirectTo: 'inicio', pathMatch: 'full'  },
  {path: 'inicio', component: InicioComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'editarPerfil', component: EditarPerfilComponent},


  { path: 'admin',  component: DefaultAdminComponent, canActivate: [AdminGuard]  ,children: [
    {path: 'empresas', component: EmpresasComponent},
    {path: 'dash-board/:idEmpresa', component: DashBoardComponent},

  ]},


  { path: 'usuario',  component: DefaultRouterComponent, canActivate: [UsuarioGuard]  ,children: [
    {path: 'editarPerfil/:idEmpresa', component: EditarPerfilComponent},
    {path: 'dash-board/:idEmpresa', component: DashBoardComponent},
    {path: 'informacion-sucursales/:idSucursal', component: InformacionSucursalesComponent},
    {path: 'informacion-sucursales', component: InformacionSucursalesComponent},
    {path: 'productos-empresas/:idEmpresa', component: ProductosEmpresasComponent},
  ]},
  { path: '**', component: InicioComponent },
  //Ruta final, redirecciona si no existe la ruta.
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
