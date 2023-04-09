import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent
{

  viewMovil:boolean = false;
  showMenu: boolean = true;

  public constructor()
  {
    if( screen.width < 769 )
    {
      this.viewMovil = false;
    }
  }

  togleMenu():void
  {
    this.showMenu = !this.showMenu;
  }

}
