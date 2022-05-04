import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { EmpresasService } from 'src/app/services/empresas.service';
import { Empresas } from 'src/app/models/empresas.model';
import { SucursalesService } from 'src/app/services/sucursales.service';
import { Sucursales } from 'src/app/models/sucursales.model';
import { ProductoSucursal } from 'src/app/models/productoSucursal.model';
import { ProductosSucursalService } from 'src/app/services/productos-sucursal.service';

@Component({
  selector: 'app-productos-empresas',
  templateUrl: './productos-empresas.component.html',
  styleUrls: ['./productos-empresas.component.scss'],
  providers: [ ProductosService, UsuarioService, SucursalesService,ProductosSucursalService,EmpresasService ]
})
export class ProductosEmpresasComponent implements OnInit {
  public productoModelGet: Producto | any;
  public productoModelPost: Producto;
  public productoModelGetId: Producto;
  public sucursalesModelGet: Sucursales ;

  public productoSucursalesModel: ProductoSucursal;


  public token
  public identidad;
  public empresaModelId: Empresas;
  public productoSucursalesModelPost: ProductoSucursal ;


  constructor(
    public _activatedRoute: ActivatedRoute,
    private _productoService: ProductosService,
    public _usuarioService: UsuarioService,
    public _sucursalesService: SucursalesService,
    public _productoSucursalService: ProductosSucursalService,
    private _empresasService: EmpresasService) {

  //this.productoModelGet = new Productos('','','',0,0,'');
  this.productoModelPost = new Producto('','','','',0,'');
  this.productoSucursalesModelPost = new ProductoSucursal('','',0,0,'','')
  this.productoModelGetId = new Producto('','','','',0,'');
  this.empresaModelId = new Empresas('','','','','','');
  this.token = this._usuarioService.obtenerToken();
  this.identidad = this._usuarioService.obtenerIdentidad();

   }

   public idEmpresa;
  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta)=>{
      console.log("idEmpresa - console"+dataRuta.get('idEmpresa'));

      this.getProductoId(dataRuta.get('idEmpresa'))
      this.idEmpresa = dataRuta.get('idEmpresa')
      this.getEmpresaId(dataRuta.get('idEmpresa'))
      this.getSucursales()
      console.log(" modelo "+this.empresaModelId)
    })
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

  getEmpresaId(idEmpresa){
    this._empresasService.ObtenerUsuariosId(idEmpresa, this._usuarioService.obtenerToken()).subscribe(
      (response) => {
        this.empresaModelId = response.empleadoEncontrado;
        console.log(response);
        console.log(this.empresaModelId);
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  getProductoId(idEmpresa){
    this._productoService.obtenerProductoId(idEmpresa, this.token).subscribe(
      (response) =>{
        this.productoModelGet = response.producto;
        console.log("response "+response);
        console.log("idEmpresa "+idEmpresa);

        console.log("Ejemplo "+this.productoModelGet);

      },
      (error)=>{

      }
    )
  }

  getProductoIdEditar(idEmpresa){
    this._productoService.obtenerProductoIdEditar(idEmpresa, this.token).subscribe(
      (response) =>{
        
        this.productoModelGetId = response.producto;
        console.log(this.productoModelGetId);
      },
      (error)=>{
        console.log(<any>error);

      }
    )
  }

  postProductos(validProducto) {
    this._productoService.RegistrarProductos(this.productoModelPost, this.token).subscribe(
      (response) => {
        this.getProductoId(this.idEmpresa)
        validProducto.reset()
        Swal.fire({
          icon: 'success',
          text: 'Datos guardados con éxito',
        })
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.message,
          footer: '*Ingrese los datos de nuevo*',
        })
      }
    )
  }

  postProductoSucursal(EnviarProducto) {
    this._productoSucursalService.MandarProductosSucursal(this.productoSucursalesModelPost, this.token).subscribe(
      (response) => {
        this.getProductoId(this.idEmpresa)
        EnviarProducto.reset()
        Swal.fire({
          icon: 'success',
          text: 'Gestión de producto a sucursal exitosa',
        })
      },
      (error) => {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.message,
          footer: '*Ingrese los datos de nuevo*',

        })
      }
    )
  }

  editarProductos() {
    this._productoService.editarProducto(this.token, this.productoModelGetId).subscribe(
      (response) => {
        this.getProductoId(this.idEmpresa)
        Swal.fire({
          icon: 'success',
          text: 'Datos editados con éxito',
        })
      },
      (error) => {
        console.log(<any>error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.message,
          footer: '*Ingrese los datos de nuevo*'

        })
      }
    )
  }

  deleteProductos(idEmpresa) {
     Swal.fire({
      title: '¿Está seguro que desea eliminar el producto?',
      text: "Este producto sera eliminado permanentemente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, estoy seguro!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._productoService.eliminarProducto(idEmpresa, this.token).subscribe(
          (response)=>{
            console.log(response);
            console.log("idempresa "+idEmpresa)
            console.log("getProductosID "+           this.getProductoId(idEmpresa)            )
            this.getProductoId(idEmpresa);
            Swal.fire(
              '¡Eliminado!',
              'El dato fue eliminado con éxito',
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

  logOut(){
    localStorage.clear()
    //localStorage.removeItem("token")
  }

}
