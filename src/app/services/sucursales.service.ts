import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Sucursales} from '../models/sucursales.model'

@Injectable({
  providedIn: 'root'
})
export class SucursalesService {

  public url: String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json')

  constructor(public _http: HttpClient) { }

  ObtenerSucursales(idEmpresa, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token)

    return this._http.get(this.url + '/sucursales/' + idEmpresa, { headers: headersToken })
  }

  AgregarSucursales(modeloSucursales: Sucursales, token): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token)
    let parametros = JSON.stringify(modeloSucursales)
    return this._http.post(this.url + '/agregarSucursales', parametros, {headers:headersToken})
  }
  EliminarUsuarios(id : String, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token)
    return this._http.delete(this.url + '/eliminarSucursales/' + id, { headers: headersToken })
  }

}
