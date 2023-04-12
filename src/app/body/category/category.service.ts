import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HelpersService } from 'src/app/services/helpers.service';
import { Category } from './category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService
{
  url:string = `${environment .url_api}category/`;
  headers = new HttpHeaders();

  constructor( private http: HttpClient, private helpers: HelpersService )
  {
    this.headers = new HttpHeaders({
      'content-type': 'application/json',
      Authorization: `Bearer ${this.helpers.getToken()}`
    });
  }

  getCategories(): Observable<any>
  {
    return this.http.get( `${this.url}index`, { headers: this.headers } );
  }

  findCategory( id: number ): Observable<any>
  {
    return this.http.get( `${this.url}find/${id}`, { headers: this.headers } );
  }

  addCategory( category: Category ): Observable<any>
  {
    return this.http.post( `${this.url}store`, category, { headers: this.headers } );
  }

  updateCategory( category: Category ): Observable<any>
  {
    return this.http.put( `${this.url}update`, category, { headers: this.headers } );
  }

  deleteCategory( id: number ): Observable<any>
  {
    return this.http.delete( `${this.url}destroy/${id}`, { headers: this.headers } );
  }

}
