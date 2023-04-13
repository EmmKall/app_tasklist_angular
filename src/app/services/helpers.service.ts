import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor() { }

  showAlert( title: string, text: string, icon: any, timer: number )
  {
    Swal.fire({ position: 'center', icon, title, text,showConfirmButton: false, timer })
  }

  compare(a: number | string, b: number | string, isAsc: boolean)
  {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  setToken( id: string, token: string, name: string, rol: string ): void
  {
    localStorage.setItem( '_token', token );
    localStorage.setItem( '_name',  name );
    localStorage.setItem( '_id',   id );
    localStorage.setItem( '_rol',  rol );
  }

  getToken(): string
  {
    const token: string = localStorage.getItem( '_token' ) ?? '';
    return token;
  }

  getName(): string
  {
    const name: string = localStorage.getItem( '_name' ) ?? '';
    return name;
  }

  getId(): string
  {
    const id: string = localStorage.getItem( '_id' ) ?? '';
    return id;
  }

  getRol(): string
  {
    const id: string = localStorage.getItem( '_rol' ) ?? '';
    return id;
  }

  destroyToken(): void
  {
    localStorage.clear();
  }

}
