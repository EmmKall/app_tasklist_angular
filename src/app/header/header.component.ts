import { Component } from '@angular/core';
import { HelpersService } from '../services/helpers.service';
import { InformationService } from '../services/information.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent
{

  viewMovil:boolean = false;
  showMenu: boolean = true;
  rol: string = this.sHelper.getRol();

  name: string = '';

  isLoged:  boolean = false;
  $isLoged: Subscription;

  public constructor( private sHelper: HelpersService, private sInformation: InformationService, private router: Router )
  {
    this.$isLoged = this.sInformation.name$.subscribe( data =>{
      this.isLoged = data;
    });

    this.name = this.sHelper.getName();
    if( this.name.length > 0 ){ this.isLoged = true; }
    else {
      this.isLoged = false;
      this.router.navigate( [ '/login' ] );
    }

    if( screen.width < 769 )
    {
      this.viewMovil = false;
    }
  }

  togleMenu():void
  {
    this.showMenu = !this.showMenu;
  }

  closeSession():void
  {
    Swal.fire({
      title: 'Are you sure?',
      text: "The session will be finish!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1677DE',
      cancelButtonColor: '#D70C0C',
      confirmButtonText: 'Yes, Logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.sHelper.showAlert( 'Logout', 'Session finished', 'success', 2500 );
        this.sHelper.destroyToken();
        this.router.navigate( [ '/login' ] );
      }
    });

  }

}
