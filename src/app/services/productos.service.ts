import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  public url: String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(public _http: HttpClient) { }


  obtenerProductoId(idEmpresa, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token)

    console.log(this.url + '/prodcutosEmpresa/' + idEmpresa)
    return this._http.get(this.url + '/prodcutosEmpresa/' + idEmpresa, { headers: headersToken })
    
  }
  
  obtenerProductoIdEditar(idEmpresa: String, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token)

    return this._http.get(this.url + '/prodcutosEmpresaId/' + idEmpresa, { headers: headersToken })
    
  }

  RegistrarProductos(modeloProducto: Producto, token): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token)
    let parametros = JSON.stringify(modeloProducto)
    return this._http.post(this.url + '/agregarProductoEmpresa', parametros, {headers:headersToken})
  }

  editarProducto(token, modeloProducto: Producto): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token)
    let parametros = JSON.stringify(modeloProducto);

    return this._http.put(this.url + '/editarProductoEmpresa/' + modeloProducto._id , parametros, {headers:headersToken})
  }
  
  eliminarProducto(id : String, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token)

    return this._http.delete(this.url + '/eliminarProductoEmpresa/' + id, { headers: headersToken })
  }
}
