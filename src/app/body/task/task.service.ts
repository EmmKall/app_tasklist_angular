import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HelpersService } from 'src/app/services/helpers.service';
import { Task } from './task';
import { Observable } from 'rxjs';

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

  addTask( task: Task ): Observable<any>
  {
    return this.http.post( `${this.url}store`, task, { headers: this.headers } );
  }

  updateTask( task: Task ): Observable<any>
  {
    return this.http.put( `${this.url}update`, task, { headers: this.headers } );
  }

  deleteTask( id: number ): Observable<any>
  {
    return this.http.delete( `${this.url}destroy/${id}`, { headers: this.headers } );
  }

}
