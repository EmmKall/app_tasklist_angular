import { Component, ViewChild } from '@angular/core';
import { HelpersService } from 'src/app/services/helpers.service';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { CategoryService } from './category.service';
import { Category } from './category';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent
{

  category: Category =
  {
    id: 0,
    name: ''
  }

  actionTittle = 'Add';
  showeModal : boolean = false;
  spinner: boolean = false;

  data: Array<any> = [];
  dataView: Array<any> = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['name', 'actions' ];
  dataSource = new MatTableDataSource( this.dataView );

  constructor( private sHelper: HelpersService, private sCategory: CategoryService )
  {
    this.getData();
    this.dataSource = new MatTableDataSource( this.data );
  }

  ngAfterViewInit()
  {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getData(): void
  {
    this.spinner = true;
    this.sCategory.getCategories().subscribe( result =>{
        const { status }:any = result;
        if( status === 200 )
        {
          const { data }:any = result;
          this.data = data;
          this.dataView = data;
          this.dataSource = new _MatTableDataSource( this.data );
          this.spinner = false;
        } else if( status === 403 )
        {
          const { msg }:any = result;
          this.sHelper.showAlert( 'Something wrong', msg, 'warning', 3000 );
          this.spinner = false;
        } else
        {
          this.sHelper.showAlert( 'Hubo un error', 'Something wrong', 'error', 3000 );
          this.spinner = false;
        }
    });
  }

  handleSubmit(): void
  {
    if( this.actionTittle === 'add' )
    {
      this.addCategory();
    } else if( this.actionTittle === 'edit' )
    {
      this.updateCategory();
    }

  }

  addCategory():void
  {
    this.spinner = true;
    const { name } = this.category;
    const data = { name };
    this.sCategory.addCategory( data ).subscribe( result =>{
      const { status } = result;
      if( status === 200 )
      {
        const { msg } = result;
        this.sHelper.showAlert( 'Status added', msg, 'success', 3000 );
        this.getData();
        this.spinner = false;
        this.category.name = '';
      } else if( status === 403 )
      {
        const { msg } = result;
        this.sHelper.showAlert( 'Something worng', msg, 'warning', 3000 );
        this.spinner = false;
      } else
      {
        this.sHelper.showAlert( 'Error', 'Something worng', 'error', 3000 );
        this.spinner = false;
      }
    } );
  }

  fillEdit( id: number ): void
  {
    this.actionTittle = 'edit';
    const category = this.data.filter( item => item.id === id );
    if( category.length > 0 )
    {
      this.category = category[0];
    } else
    {
      this.sHelper.showAlert( 'error', 'Satus not valid', 'warning', 3000 );
    }
  }

  cancelEdit(): void
  {
    this.actionTittle = 'add';
    this.category =
    {
      id: 0,
      name: ''
    }
  }

  updateCategory(): void
  {
    this.spinner = true;
    this.sCategory.updateCategory( this.category ).subscribe( result =>{
      const { status } = result;
      if( status === 200 )
      {
        const { msg } = result;
        this.sHelper.showAlert( 'Status Updated', msg, 'success', 3000 );
        this.spinner = false;
        this.actionTittle === 'add';
        this.category =
        {
          id: 0,
          name: ''
        };
      } else if( status === 403 )
      {
        const { msg } = result;
        this.sHelper.showAlert( 'Somthing wrong', msg, 'warning', 3000 );
        this.spinner = false;
      } else
      {
        this.sHelper.showAlert( 'Error', 'Somethig wring', 'warning', 3000 );
        this.spinner = false;
      }
    });
  }

  deleteCategory( id:number ):void
  {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to recovit it!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner = true;
        this.sCategory.deleteCategory( id ).subscribe( result =>{
          const { status } = result;
          if( status === 200 )
          {
            const { msg }= result;
            this.sHelper.showAlert( 'Status deleted', msg, 'success', 3000 );
            this.getData();
            this.spinner = false;
          } else if( status === 403 )
          {
            const { msg }= result;
            this.sHelper.showAlert( 'Something wrong', msg, 'warning', 3000 );
            this.spinner = false;
          } else
          {
            this.sHelper.showAlert( 'Error', 'Something wrong', 'error', 3000 );
            this.spinner = false;
          }
        });
      }
    })

  }

}

