import { Component } from '@angular/core';
import { HelpersService } from 'src/app/services/helpers.service';
import { UserService } from './user.service';

import { User } from './user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent
{
  showeModalPass: boolean = false;
  showeModalEdit: boolean = false;

  password: any =
  {
    pass: '',
    cpass: ''
  };

  user: User = {
    id: Number( this.sHelper.getId() ),
    name: '',
    email: '',
    phone: '',
    rol: 0
  }

  spinner:boolean = false;

  constructor( private sHelper: HelpersService, private sUser: UserService )
  {
    this.getData();
  }

  getData(): void
  {
    this.spinner = true;
    this.sUser.findUser( Number( this.user.id ) ).subscribe( response =>{
      const { status } = response;
      if( status === 200 )
      {
        const { data } = response;
        this.user = data;
        /* console.log( this.user ); */
        this.spinner = false;
      } else if( status === 403 )
      {
        const { msg } = response;
        this.sHelper.showAlert( 'Something wrong', msg, 'warning', 3000 );
        this.spinner = false;
      } else
      {
        this.sHelper.showAlert( 'Error', 'Something wrong', 'warning', 3000 );
        this.spinner = false;
      }
    });
  }

  editUser(): void
  {
    this.spinner = true;
    this.sUser.updateUser( this.user ).subscribe( response =>{
      const { status } = response;
      if( status === 200 )
      {
        this.getData();
        this.sHelper.showAlert( 'Updated successfully', 'Profile updated', 'success', 3000 );
        this.spinner = false;
      } else if( status === 403 )
      {
        const { msg } = response;
        this.sHelper.showAlert( 'Something wrong', msg, 'warning', 3000 );
        this.spinner = false;
      } else
      {
        this.sHelper.showAlert( 'Error', 'Something wrong', 'warning', 3000 );
        this.spinner = false;
      }
    });
  }

  showEditPassword():void
  {
    this.showeModalPass = true;
    console.log( 'pass' );
  }

  showEdit():void
  {
    this.showeModalEdit = true;
  }

  updatePass(): void
  {
    this.spinner = true;
    const { email } = this.user;
    const { pass, cpass } = this.password;
    if( pass !== cpass )
    {
      this.sHelper.showAlert( 'Password does not match', 'Password are not equals', 'error', 3000  );
      return;
    }
    const data = { email, password: pass };
    this.sUser.updatePassword( data ).subscribe( response => { /* console.log( response ); */
      const { status } = response;
      if( status === 200 )
      {
        this.sHelper.showAlert ( 'Password updated', 'Password updated successfully', 'success', 3000 );
        this.spinner = false;
        this.closeModalPass();
      }else if( status === 403 )
      {
        this.sHelper.showAlert ( 'Password not updated', 'something worng', 'warning', 3000 );
        this.spinner = false;
      } else
      {
        this.sHelper.showAlert ( 'Error', 'Something wrong', 'error', 3000 );
        this.spinner = false;
      }
    });
  }

  updatedProfile():void
  {
    this.spinner = true;
    const eEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const { name, email, phone } = this.user;
    if( name === '' || email === '' || phone === '' )
    {
        this.sHelper.showAlert( 'Missing data', 'All the data are required', 'error', 3000 );
        this.spinner = false;
        return;
    }
    if( !eEmail.test( email ) )
    {
      this.sHelper.showAlert( 'Email no valid', 'Email format no valid', 'error', 3000 );
      this.spinner = false;
      return;
    }
    this.sUser.updateUser( this.user ).subscribe( response =>{ /* console.log( response ); */
      const { status } = response;
      if( status === 200 )
      {
        this.sHelper.showAlert ( 'Profile updated', 'Profiel updated successfully', 'success', 3000 );
        this.closeModalEdit();
        this.getData();
        this.password.pass = '';
        this.password.cpass = '';
        this.closeModalPass();
        this.spinner = false;
      }else if( status === 403 )
      {
        this.sHelper.showAlert ( 'Profiel not updated', 'something worng', 'warning', 3000 );
        this.spinner = false;
      } else
      {
        this.sHelper.showAlert ( 'Error', 'Something wrong', 'error', 3000 );
        this.spinner = false;
      }
    });
  }

  closeModalPass(): void
  {
    this.showeModalPass = false;
  }

  closeModalEdit(): void
  {
    this.showeModalEdit = false;
  }




}
