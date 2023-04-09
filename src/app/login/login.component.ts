import { Component } from '@angular/core';
import { FormBuilder, FormsModule, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HelpersService } from '../services/helpers.service';
import { LoginService } from './login.service';


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

  constructor( private formBuilder: FormBuilder, private router: Router, private helpers: HelpersService, private sLogin: LoginService )
  {
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
        this.helpers.showAlert( 'Welcome', 'Login sucessfully', 'success', 3000 );
        setTimeout(() => {
          this.router.navigate( ['/'] );
        }, 2300);
      } else if( status === 403 )
      {
        this.helpers.showAlert( 'Login failed', 'Credentials not valid', 'warning', 3000 );
      } else
      {
        this.helpers.showAlert( 'Error', 'Something wrong', 'error', 3000 );
      }
      console.log( result );
      this.spinner = false;
    })

  }

}
