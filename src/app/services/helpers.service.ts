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

}
