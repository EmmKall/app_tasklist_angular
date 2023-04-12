import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HelpersService } from 'src/app/services/helpers.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService
{

  url:string = `${environment .url_api}task/`;
  headers = new HttpHeaders();

  constructor( private http: HttpClient, private helpers: HelpersService )
  {
    this.headers = new HttpHeaders({
      'content-type': 'application/json',
      Authorization: `Bearer ${this.helpers.getToken()}`
    });
  }

  getTasks()
  {
    const id = this.helpers.getId();
    return this.http.get( `${this.url}findall/${id}`, { headers: this.headers } );
  }
}
