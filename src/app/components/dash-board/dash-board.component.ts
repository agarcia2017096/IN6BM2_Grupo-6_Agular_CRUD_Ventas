import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sucursales } from 'src/app/models/sucursales.model';
import { ProductosSucursalService } from 'src/app/services/productos-sucursal.service';
import { SucursalesService } from 'src/app/services/sucursales.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';  


@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss'],
  providers: [SucursalesService,UsuarioService,ProductosSucursalService]

})

export class DashBoardComponent implements OnInit {
  public token;
  public identidad;

  public coloresDinamicos = ['red','yellow','blue','green','orange',"skyblue",'red','yellow','blue','green','orange',"skyblue"]
  public imagenesDinamicas = [
    { url: 'iconCard2.jpg' },
    { url: 'iconCard1.jpg' },
    
  ]

  public random = Math.floor(Math.random()*this.coloresDinamicos.length)


  //EMPRESAS
  public sucursalesModelGet: Sucursales ;
  public sucursalModelId: Sucursales ;
  public sucursalModelIdEdit: Sucursales;

  public sucursalesModelPost: Sucursales ;


  constructor(    public _productoSucursalService: ProductosSucursalService,
    public _activatedRoute: ActivatedRoute, private _sucursalesService: SucursalesService, public _usuarioService: UsuarioService)
     {
    this.sucursalesModelPost = new Sucursales('','','','','')
    this.sucursalModelId = new Sucursales('','','','','')
    this.sucursalModelIdEdit = new Sucursales("", "", "", "", "");

    this.token = this._usuarioService.obtenerToken()
    this.identidad = this._usuarioService.obtenerIdentidad();

  }

  public idEmpresa;
  public id;

  ngOnInit(): void {
    console.log(this.identidad)
    this._activatedRoute.paramMap.subscribe((dataRuta)=>{

      console.log(dataRuta.get('idEmpresa'));
      this.idEmpresa = dataRuta.get('idEmpresa')

      this.id = dataRuta.get('id')
      this.getSucursalId('id')

      console.log("RAMPOM "+this.random)

      this.getSucursales ()
      console.log("IMAGENES"+this.imagenesDinamicas)

      this.imagenesDinamicas.forEach(element => {
        console.log("IMAGENES "+element)

      });

    })
  }

  getSucursalesId(idSucursal) {
    this._sucursalesService.ObtenerSucursalesId(this._usuarioService.obtenerToken(), idSucursal).subscribe({
      
      next: (response: any)=> {  // 200
        
        this.sucursalModelIdEdit = response.Sucursal
        console.log(this.sucursalModelIdEdit)
      },
      error: (err) => { //400 404 500 401 403
        Swal.fire({
          icon: "error",
          title: err.error.mensaje,
          footer: "Ingrese los datos de nuevo",
        });
      },
      complete: ()=>{

      }})
  }

  getSucursales (){
    console.log('el id de la empresa es:' + this.idEmpresa)
      this._sucursalesService.ObtenerSucursales (this.idEmpresa, this.token).subscribe(
        (response) => {
          this.sucursalesModelGet = response.Sucursales;
          console.log(response + 'hola');
 
        },
        (error)=>{
          console.log(<any>error)
        }
     )
    
    }

    postSucursal(){
      this._sucursalesService.AgregarSucursales(this.sucursalesModelPost, this.token= this._usuarioService.obtenerToken()).subscribe(
        (response)=>{
          console.log(response);
          this.getSucursales()
          Swal.fire(
            'Se agrego correctamente su sucursal!',
            '',
            'success'
          )
       },
       (error)=>{
          console.log(<any>error);
          Swal.fire({
            icon: 'error',
            title: error.error.message,
            footer: 'Ingrese los datos de nuevo'
          })
       }
      )
    }

    putSucursales(idSucursal) {
      this._sucursalesService.EditarSucursales(this.sucursalModelIdEdit, this._usuarioService.obtenerToken(), idSucursal).subscribe({
        
        next: (response: any)=> {  // 200
          
          this.getSucursales();
        },
        error: (err) => { //400 404 500 401 403
          Swal.fire({
            icon: "error",
            title: err.error.message,
            footer: "Ingrese los datos de nuevo",
          });
          console.log(err);
        },
        complete: ()=>{
  
        }})
    }

    deleteSucursales(idSucursal){
      
      Swal.fire({
        title: '¿Está seguro que desea eliminar la sucursal?',
        text: "Será eliminada permanentemente",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Si, estoy seguro!'
      }).then((result) => {
        if (result.isConfirmed) {
          this._sucursalesService.EliminarUsuarios(idSucursal, this.token = this._usuarioService.obtenerToken()).subscribe(
            (response)=>{
              console.log(response);
              this.getSucursales();
              Swal.fire(
                '¡Eliminación completada!',
                'El dato fue eliminado exitosamente',
                'success'
              )
            },
            (error)=>{
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.error.message,
              })
      
            }
          )
          
        }
      })
    }

    getSucursalId(idSucursal){
      this._productoSucursalService.ObtenerSucursalId(idSucursal, this.token).subscribe(
        (response) => {
          this.sucursalModelId = response.Sucursal;
          console.log(response);
          console.log(this.sucursalModelId);
        },
        (error)=>{
          console.log(<any>error)
        }
      )
    }


}
