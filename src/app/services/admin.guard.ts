import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  public identidad;
  constructor(
    public _router: Router
  ){}

  canActivate(){
    if(this.obtenerIdentidad().rol !== "ROL_ADMINISTRADOR"){
      this._router.navigate(['/inicio'])
      return false;
    }

    return true;
  }

  obtenerIdentidad(){
    var identidad2 = JSON.parse(localStorage.getItem('identidad'));
    if(identidad2 != undefined){
      this.identidad = identidad2;
    } else {
      this.identidad = null;
    }

    return this.identidad;
  }

}
