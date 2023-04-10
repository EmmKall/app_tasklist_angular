import { Component } from '@angular/core';
import { FormBuilder, FormsModule, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HelpersService } from '../services/helpers.service';
import { LoginService } from './login.service';
import { InformationService } from '../services/information.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent
{
  dataLogin:any = {
    'email': '',
    'password': ''
  };

  spinner:boolean = false;

  form: FormGroup;

  $isLoged: Subscription;

  constructor( private formBuilder: FormBuilder, private router: Router, private helpers: HelpersService, private sLogin: LoginService, private sInformation: InformationService )
  {
    this.$isLoged = this.sInformation.name$.subscribe();

    this.form = this.formBuilder.group({
      email:    [ '', [ Validators.required ],[] ],
      password: [ '', [ Validators.required ],[] ],
    });
  }

  handleSubmit()
  {
    this.spinner = true;
    if( !this.form.valid )
    {
      this.helpers.showAlert( 'Invalid form', 'All fields are required', 'error', 3000 );
      return;
    }
    this.dataLogin = this.form.value;

    this.sLogin.login( this.dataLogin ).subscribe( result =>
    {
      const { status } = result;
      if( status === 200 )
      {
        /* Update Token */
        const { user, token } = result.data;
        this.helpers.setToken( token, user );
        this.sInformation.name$.emit( true );
        this.helpers.showAlert( 'Welcome', 'Login sucessfully', 'success', 2500 );
        setTimeout(() => {
          this.router.navigate( ['/app'] );
        }, 2500);
      } else if( status === 403 )
      {
        this.helpers.showAlert( 'Login failed', 'Credentials not valid', 'warning', 3000 );
      } else
      {
        this.helpers.showAlert( 'Error', 'Something wrong', 'error', 3000 );
      }
      this.spinner = false;
    })

  }

}
