import { Component, ViewChild } from '@angular/core';
import { HelpersService } from 'src/app/services/helpers.service';
import { TaskService } from './task.service';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Task } from './task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent
{
  modalTittle = '';
  showeModal : boolean = false;

  task: Task =
  {
    id: 0,
    name: '',
    description: '',
    user: this.sHelper.getId(),
    category: ''
  }

  data: Array<any> = [];
  dataView: Array<any> = [];

  displayedColumns: string[] = ['name', 'description', 'category', 'actions' ];
  dataSource = new MatTableDataSource( this.dataView );
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filter:string = '';

  constructor( private sHelper: HelpersService, private sTask: TaskService )
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
    this.sTask.getTasks().subscribe( result =>{
        const { status }:any = result;
        if( status === 200 )
        {
          const { data }:any = result;
          this.data = data;
          this.dataView = data;
          this.dataSource = new _MatTableDataSource( this.data );
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

  showAddTsk():void
  {
    this.modalTittle = 'Add';
    this.showeModal = true;
  }

  addTask():void
  {
    console.log( this.task );
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

}

