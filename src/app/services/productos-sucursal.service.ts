import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductoSucursal } from '../models/productoSucursal.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosSucursalService {

  public url: String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(public _http: HttpClient) { }


  ObtenerProductosSucursal(idSucursal, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token)
    console.log(this.url + '/productosSucursal/' + idSucursal)

    return this._http.get(this.url + '/productosSucursal/' + idSucursal, { headers: headersToken })
  }

  MandarProductosSucursal(modeloProductoSucursala: ProductoSucursal, token): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token)
    let parametros = JSON.stringify(modeloProductoSucursala)
    return this._http.post(this.url + '/agregarProductoSucursal', parametros, {headers:headersToken})
  }

  EliminarProducto(idProductoSucursal : String, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token)

    return this._http.delete(this.url + '/eliminarProductoSucursal/' + idProductoSucursal, { headers: headersToken })
  }

  ObtenerSucursalId(idSucursal:String, token): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/sucursalId/' + idSucursal, {headers: headersToken})
  }

  obtenerProductoSucursalId(idSucursal, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token)

    console.log(this.url + '/productosSucursal/' + idSucursal)
    return this._http.get(this.url + '/productosSucursal/' + idSucursal, { headers: headersToken })
    
  }

  venderProductoSucursal(modeloProductoSucursala: ProductoSucursal,idSucursal:String,token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token)
    let parametros = JSON.stringify(modeloProductoSucursala);

    return this._http.put(this.url + '/venderProductosSucursal/' + idSucursal , parametros, {headers:headersToken})
  }

}
