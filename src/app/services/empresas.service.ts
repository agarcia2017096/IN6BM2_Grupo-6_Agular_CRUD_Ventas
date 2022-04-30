import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Empresas } from '../models/empresas.model';


@Injectable({
  providedIn: 'root'
})

export class EmpresasService {
  public url: String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json')


  constructor(public _http: HttpClient) { }

  ObtenerUsuarios():Observable<any>{
    return this._http.get(this.url+'/empresas', {headers: this.headersVariable})
  }
  RegistrarEmpresas(modeloEmpresa: Empresas, token): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token)
    let parametros = JSON.stringify(modeloEmpresa)
    return this._http.post(this.url + '/agregarEmpresa', parametros, {headers:headersToken})
  }
  EliminarUsuarios(id : String, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token)
    return this._http.delete(this.url + '/eliminarEmpresa/' + id, { headers: headersToken })
  }
  ObtenerUsuariosId(id:String, token): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/empresasId/' + id, {headers: headersToken})
  }

  EditarUsuarios(modeloEmpresa: Empresas, token): Observable<any> {
    let parametros = JSON.stringify(modeloEmpresa);
    let headersToken = this.headersVariable.set('Authorization', token);
    console.log(modeloEmpresa._id)
    return this._http.put(this.url + '/editarEmpresa/' + modeloEmpresa._id, parametros, { headers: headersToken })
  }
}
