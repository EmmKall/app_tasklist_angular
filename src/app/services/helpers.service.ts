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

  setToken( $token: string, $name: string ): void
  {
    localStorage.setItem( '_token', $token );
    localStorage.setItem( '_name',  $name );
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

  destroyToken(): void
  {
    localStorage.clear();
  }

}
