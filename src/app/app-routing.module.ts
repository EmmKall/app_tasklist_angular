import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { LoginComponent } from './login/login.component';
import { SesionGuard } from './guards/sesion.guard';
import { TaskComponent } from './body/task/task.component';
import { CategoryComponent } from './body/category/category.component';
import { UsersComponent } from './body/users/users.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'app',   component: BodyComponent, canActivate: [ SesionGuard ], children: [
    { path: 'task', component: TaskComponent },
    { path: 'category', component: CategoryComponent },
    { path: 'user', component: UsersComponent },
    { path: '**', component: TaskComponent },
  ] },
  { path: '**',    component: BodyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
