import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Empresas } from 'src/app/models/empresas.model';
import { Producto } from 'src/app/models/producto.model';
import { ProductoSucursal } from 'src/app/models/productoSucursal.model';
import { Sucursales } from 'src/app/models/sucursales.model';
import { EmpresasService } from 'src/app/services/empresas.service';
import { ProductosSucursalService } from 'src/app/services/productos-sucursal.service';
import { SucursalesService } from 'src/app/services/sucursales.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-informacion-sucursales',
  templateUrl: './informacion-sucursales.component.html',
  styleUrls: ['./informacion-sucursales.component.scss'],
  providers: [ UsuarioService, SucursalesService,ProductosSucursalService,EmpresasService]

})
export class InformacionSucursalesComponent implements OnInit {

  public sucursalesModelGet:any = [];
  
  chartOptions = {
    responsive: true,
  };
  //Nombres productos
  chartLabels:any = [];
  //cantidad de producto
  chartData:any = [];
  chartColors:any = [
    {
      backgroundColor: []
    }
  ];
  chartLegend = true;
  chartPlugins = [];

  
  public productoModelGet: Producto | any;

  public productoSucursalesModelGet: ProductoSucursal;
  public productoSucursalesModelGetId: ProductoSucursal;


  public token
  public identidad;
  public empresaModelId: Empresas;
  public sucursalModelId: Sucursales;
  public contador: Number = 0;




  constructor(
    public _activatedRoute: ActivatedRoute,
    public _usuarioService: UsuarioService,
    public _sucursalesService: SucursalesService,
    public _productoSucursalService: ProductosSucursalService,
    private _empresasService: EmpresasService
    ) {
      this.productoSucursalesModelGetId = new ProductoSucursal('','',0,0,'','')
      this.sucursalModelId = new Sucursales('','','','','')
      this.token = this._usuarioService.obtenerToken();
      this.identidad = this._usuarioService.obtenerIdentidad();
   }

   public idEmpresa;
   public id;
   public idSucursal;


  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta)=>{
      this.idEmpresa = dataRuta.get('idSucursal')
  
      this.getProductoId(dataRuta.get('idSucursal'))

      this.getSucursalId(dataRuta.get('idSucursal'))

      console.log(" id sucursal "+this.idEmpresa)

      this.getSucursales (dataRuta.get('idSucursal'));      
    })
  }

  getSucursales (idSucursal){
      this._productoSucursalService.ObtenerProductosSucursal (idSucursal, this.token).subscribe(
        (response) => {
          this.sucursalesModelGet = response.producto;
          console.log(this.sucursalesModelGet)
          this._activatedRoute.paramMap.subscribe((dataRuta)=>{ 
            
            console.log( ' ARRAY'+ this.sucursalesModelGet       )
            this.sucursalesModelGet.forEach(element => {
              console.log(element)
            });

            this.getSucursalesGrafica (dataRuta.get('idSucursal'))
  
          })
        },
        (error)=>{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.error.message,
          })        }
     )
    
  }

  getSucursalesGrafica (idSucursal){
    this.sucursalesModelGet
    this._productoSucursalService.ObtenerProductosSucursal (idSucursal, this.token).subscribe(
      (response) => {

        this.sucursalesModelGet.forEach(dato => {
          this.chartLabels.push(dato.NombreProductoSucursal);
        this.chartData.push(dato.Vendido);
        this.chartColors[0].backgroundColor.push(`#${ Math.floor(Math.random()*16777215).toString(16)}`)
        
       // 
      });
      },
      (error)=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.message,
        })        }
   )
  
}

  
  getSucursalId(idSucursal){
    this._productoSucursalService.ObtenerSucursalId(idSucursal, this.token).subscribe(
      (response) => {
        this.sucursalModelId = response.Sucursal;
        console.log(response);
        console.log(this.sucursalModelId);
      },
      (error)=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.message,
        })      }
    )
  }

  getProductoId(idSucursal){
    this._productoSucursalService.ObtenerProductosSucursal(idSucursal, this.token).subscribe(
      (response) =>{
        this.productoSucursalesModelGet = response.producto;
        console.log("response "+response);
        console.log("idSucursal "+idSucursal);

        console.log("Ejemplo "+this.productoSucursalesModelGet);
      },
      (error)=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.message,
        })      }
    )
  }
  
  deleteProductos(idSucursal) {
    Swal.fire({
      title: '¿ Está seguro que desea eliminar el productor?',
      text: "Será eliminado permanentemente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, estoy seguro!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._productoSucursalService.EliminarProducto(idSucursal, this.token).subscribe(
          (response)=>{
            console.log(response);
            console.log("idSucursal "+idSucursal)
            console.log("getProductosID "+            this.getProductoId(idSucursal)            )


            Swal.fire(
              '¡Eliminado!',
              'El producto fue eliminado exitosamente',
              'success'
            )
  
            this.chartOptions = {
              responsive: true,
            };
            //Nombres productos
            this.chartLabels = [];
            //cantidad de producto
            this. chartData = [];
            this.chartColors = [
              {
                backgroundColor: []
              }
            ];
            this. chartLegend = true;
            this.chartPlugins = [];
    
            this._activatedRoute.paramMap.subscribe((dataRuta)=>{
              this.getSucursales (dataRuta.get('idSucursal'));
    
    
              
              console.log( ' ARRAY'+ this.sucursalesModelGet       )
              this.sucursalesModelGet.forEach(element => {
                console.log(element)
              });
            })    
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



  editarProductosSucursal(idSucursal) {
    idSucursal = this.idEmpresa
    console.log(this.idSucursal)
          console.log(" id sucursal "+idSucursal)

    this._productoSucursalService.venderProductoSucursal( this.productoSucursalesModelGetId,idSucursal,this.token,).subscribe(
      (response) => {
        this.getProductoId(this.idEmpresa);
        this.chartData.push(response.Vendido)
        Swal.fire({
          icon: 'success',
          text: 'Venta exitosa',
        })

        this.chartOptions = {
          responsive: true,
        };
        //Nombres productos
        this.chartLabels = [];
        //cantidad de producto
        this. chartData = [];
        this.chartColors = [
          {
            backgroundColor: []
          }
        ];
        this. chartLegend = true;
        this.chartPlugins = [];

        this._activatedRoute.paramMap.subscribe((dataRuta)=>{
          this.getSucursales (dataRuta.get('idSucursal'));


          
          console.log( ' ARRAY'+ this.sucursalesModelGet       )
          this.sucursalesModelGet.forEach(element => {
            console.log(element)
          });
        })      
      },

      (error) => {
        console.log(<any>error);
        console.log('EJEMPLO');

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.message,
        })
      }
    )
  }


  

}
