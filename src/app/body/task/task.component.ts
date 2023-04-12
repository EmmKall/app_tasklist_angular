import { Component, ViewChild } from '@angular/core';
import { HelpersService } from 'src/app/services/helpers.service';
import { TaskService } from './task.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import Swal from 'sweetalert2';
import { Task } from './task';
import { CategoryService } from '../category/category.service';
import { Category } from '../category/category';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent
{
  modalTittle = '';
  showeModal : boolean = false;

  spinner: boolean = false;

  task: Task =
  {
    id: 0,
    name: '',
    description: '',
    user: this.sHelper.getId(),
    category: ''
  }

  data: Array<Task> = [];
  dataView: Array<Task> = [];
  dataCategory: Array<Category> = [];

  displayedColumns: string[] = ['name', 'description', 'category', 'actions' ];
  dataSource = new MatTableDataSource( this.dataView );

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  filter:string = '';

  constructor( private sHelper: HelpersService, private sTask: TaskService, private sCategory: CategoryService )
  {
    this.getData();
    this.getDataCategory();
    this.dataSource = new MatTableDataSource( this.data );
  }

  ngAfterViewInit()
  {
    this.dataSource.paginator = this.paginator;
  }

  getData(): void
  {
    this.sTask.getTasks().subscribe( result =>{
        const { status }:any = result;
        if( status === 200 )
        {
          const { data }:any = result;
          this.data = data;
          this.dataView = data;
          this.dataSource = new MatTableDataSource( this.data );
          /* console.log( this.data ); */
        } else if( status === 403 )
        {
          const { msg }:any = result;
          this.sHelper.showAlert( 'Something wrong', msg, 'warning', 3000 );
        } else
        {
          this.sHelper.showAlert( 'Hubo un error', 'Something wrong', 'error', 3000 );
        }
    });
  }

  getDataCategory(): void
  {
    this.sCategory.getCategories().subscribe( result =>{
        const { status }:any = result;
        if( status === 200 )
        {
          const { data }:any = result;
          this.dataCategory = data;
        } else if( status === 403 )
        {
          const { msg }:any = result;
          this.sHelper.showAlert( 'Something wrong', msg, 'warning', 3000 );
        } else
        {
          this.sHelper.showAlert( 'Hubo un error', 'Something wrong', 'error', 3000 );
        }
    });
  }

  cleanTask():void
  {
    this.task =
    {
      id: 0,
      name: '',
      description: '',
      user: this.sHelper.getId(),
      category: ''
    }
  }

  showEditTask():void
  {
    this.modalTittle = 'Edit';
    this.showeModal = true;
  }

  closeModal(): void
  {
    this.showeModal = false;
  }

  filterData():void
  {
    if( this.filter.length > 0 )
    {
      this.dataView = [];
      this.data.forEach( item => {
        const { name, category, description } = item;
        if( name.includes( this.filter ) || description.includes( this.filter ) || category.includes( this.filter ) )
        {
            this.dataView = [ ...this.dataView, item ];
        }
      });
    } else
    {
      this.dataView = this.data;
    }
  }

  showAddTask():void
  {
    this.modalTittle = 'Add';
    this.showeModal = true;
  }

  handleSubmit(): void
  {
    if( this.task.id === 0 )
    {
      this.addTask();
    } else
    {
      this.editTask();
    }
  }

  addTask():void
  {
    this.spinner = true;
    const { name, user, category, description } = this.task;
    const data = { name, user, category, description };
    this.sTask.addTask( data ).subscribe( response => {
      const { status } = response;
      if( status === 200 )
      {
        this.sHelper.showAlert( 'Add task successfully', 'Task updated', 'success', 3000 );
        this.getData();
        this.cleanTask();
        this.closeModal();
        this.spinner = false;
      } else if( status === 403 )
      {
        const { msg } = response;
        this.sHelper.showAlert( 'Something wrong', msg, 'warning', 3000 );
        this.spinner = false;
      } else
      {
        this.sHelper.showAlert( 'Error', 'Something wrong', 'error', 3000 );
        this.spinner = false;
      }
    });

  }

  fillData( id:number ):void
  {
    const task = this.data.filter( item => item.id === id );
    if( task.length > 0 )
    {
      const { name, description, idCategory: category } = task[0];
      this.task = { id, name, description, user: this.sHelper.getId(), category };
      this.showAddTask();
    } else
    {
      this.sHelper.showAlert( 'Error', 'Item not found', 'error', 3000 );
    }
  }

  editTask():void
  {
    this.spinner = true;
    this.sTask.updateTask( this.task ).subscribe( response =>{
      const { status } = response;
      if( status === 200 )
      {
        const { msg } = response;
        this.sHelper.showAlert( 'Task updated', msg, 'success', 3000 );
        this.getData();
        this.spinner = false;
        this.cleanTask();
        this.closeModal();
      } else if( status === 403 )
      {
        const { msg } = response;
        this.sHelper.showAlert( 'Something wrong', msg, 'warning', 3000 );
        this.spinner = false;
        this.closeModal();
      } else
      {
        this.sHelper.showAlert( 'Error', 'Something wrong', 'error', 3000 );
        this.spinner = false;
        this.closeModal();
      }
    });
  }

  deleteTask( id: number): void
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
        this.sTask.deleteTask( id ).subscribe( result =>{ /* console.log( result ); */
          const { status } = result;
          if( status === 200 )
          {
            const { msg }= result;
            this.sHelper.showAlert( 'Task deleted', msg, 'success', 3000 );
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

