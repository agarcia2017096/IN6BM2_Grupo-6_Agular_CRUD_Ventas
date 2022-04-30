import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empresas } from 'src/app/models/empresas.model';
import { EmpresasService } from 'src/app/services/empresas.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  providers: [EmpresasService, UsuarioService]

})
export class RegistroComponent implements OnInit {
  public token;
  public repeatPass:string = ''

  public usuarioModel: Empresas;
  public empresasModelPost: Empresas;
  constructor(private _empresasService: EmpresasService, private _usuarioService: UsuarioService, private _router: Router) {
    this.empresasModelPost = new Empresas('','', '', '', '', '')
    this.token = this._usuarioService.obtenerToken();
  }

  ngOnInit(): void {
  }

  checkPass(){
    if(this.repeatPass != this.empresasModelPost.password){
      Swal.fire({
        icon: 'error',
        title: 'Las contraseñas no coinciden',
        footer: 'Verifique los datos'
      })
    }else{
      this.postEmpresas()
    }
  }

  postEmpresas() {
    this._empresasService.RegistrarEmpresas(this.empresasModelPost, this.token = this._usuarioService.obtenerToken()).subscribe(
      (response) => {
        localStorage.setItem("identidad", JSON.stringify(response.usuario))
        console.log(response);
          this._router.navigate(['/login']);
      },
      (error) => {
        console.log(<any>error);
        Swal.fire({
          icon: 'error',
          title: error.error.message,
          footer: '*Ingrese los datos de nuevo*'
        })
      }
    )
  }

}
