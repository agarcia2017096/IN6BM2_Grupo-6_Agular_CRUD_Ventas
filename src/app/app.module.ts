import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InformacionSucursalesComponent } from './components/informacion-sucursales/informacion-sucursales.component';
import { FooterComponent } from './components/footer/footer.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { ProductosEmpresasComponent } from './components/productos-empresas/productos-empresas.component';
import { ChartsModule } from '@rinminase/ng-charts';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DefaultRouterComponent } from './components/default-router/default-router.component';
import { DefaultAdminComponent } from './components/default-admin/default-admin.component';
import { EditarPerfilComponent } from './components/editar-perfil/editar-perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    DashBoardComponent,
    LoginComponent,
    RegistroComponent,
    InicioComponent,
    NavbarComponent,
    InformacionSucursalesComponent,
    FooterComponent,
    EmpresasComponent,
    ProductosEmpresasComponent,
    DefaultRouterComponent,
    DefaultAdminComponent,
    EditarPerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ChartsModule

  ],
  providers: [
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
