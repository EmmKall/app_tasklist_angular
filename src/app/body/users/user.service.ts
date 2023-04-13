import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HelpersService } from 'src/app/services/helpers.service';
import { Observable } from 'rxjs';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url:string = `${environment .url_api}user/`;
  headers = new HttpHeaders();

  constructor( private http: HttpClient, private helpers: HelpersService )
  {
    this.headers = new HttpHeaders({
      'content-type': 'application/json',
      Authorization: `Bearer ${this.helpers.getToken()}`
    });
  }

  findUser( id: number ): Observable<any>
  {
    return this.http.get( `${this.url}find/${id}`, { headers: this.headers } );
  }

  addUser( data: User ): Observable<any>
  {
    return this.http.post( `${this.url}store`, data, { headers: this.headers } );
  }

  updateUser( data: User ): Observable<any>
  {
    return this.http.put( `${this.url}update`, data, { headers: this.headers } );
  }

    updatePassword( data: object ): Observable<any>
  {
    return this.http.post( `${this.url}update_pass`, data, { headers: this.headers } );
  }

  deleteUser( id: number ): Observable<any>
  {
    return this.http.delete( `${this.url}destroy/${id}`, { headers: this.headers } );
  }

}
