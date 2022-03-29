import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserCreateEditComponent } from './components/user-create-edit/user-create-edit.component';
import { UserListComponent } from './components/user-list/user-list.component';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent
  },
  {
    path: 'create',
    component: UserCreateEditComponent
  },
  {
    path: 'edit/:userId',
    component: UserCreateEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule { }
