import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'projects/core/helpers';
import { Role } from 'projects/core/models/db/role.enum';
import { Projects } from 'projects/core/models/projects.enum';

import { LoginComponent } from 'projects/dashboard/src/app/pages/login/login.component';
import { HomeComponent } from 'projects/dashboard/src/app/pages/home/home.component';
import { MyOrdersComponent } from 'projects/dashboard/src/app/pages/my-orders/my-orders.component';

// export const MY_PAGES = ['login', 'dashboard', 'orders'];

export const enum routesEnum {
  NotFound  = '**',
  Login     = 'login',
  Home      = '',
  Admin     = 'admin',
  Orders    = 'orders',
}

const routes: Routes = [
  {
    path: routesEnum.Login,
    component: LoginComponent,
    data: {
      project: Projects.BACKOFFICE,
      title: 'Login'
    }
  },
  {
    path: '',
    // loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    component: HomeComponent, // pathMatch: 'full'
    canActivate: [AuthGuard],
    data: {
      title: 'Dashboard',
      project: Projects.BACKOFFICE,
      roles: [Role.Admin, Role.Developer],
    }
  },
  {
    path: 'orders',
    // loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    component: MyOrdersComponent, // pathMatch: 'full'
    canActivate: [AuthGuard],
    data: {
      project: Projects.BACKOFFICE,
      roles: [Role.Admin, Role.Developer],
      title: 'My Orders'
    }
  },
  { path: 'refresh', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
