import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'projects/core/helpers';
import { NotFoundComponent } from './components';
import { HomeComponent, MenuComponent, ShopcartComponent, PlacingYourOrderComponent } from './pages';


const routes: Routes = [
  {
    path: '', component: HomeComponent,
    // loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    // pathMatch: 'full'
    data: {
      title: 'Restaurante Manhattan',
      meta: ''
    }
  },
  {
    path: 'menu', component: MenuComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Restaurante Manhattan | Menú',
      meta: '',
      auth: 'VIEW_ONLY',
      expectedRole: 'admin'
    }
  },
  {
    path: 'shopcart', component: ShopcartComponent,
    // canActivate: [AuthGuard],
    data: {
      title: 'Restaurante Manhattan | ShopCart',
      meta: '',
      auth: 'VIEW_ONLY',
      expectedRole: 'admin'
    }
  },
  {
    path: 'placing-your-order', component: PlacingYourOrderComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Restaurante Manhattan | Placing Your Order',
      meta: '',
      auth: 'VIEW_ONLY',
      expectedRole: 'admin'
    }
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // providers: [AuthGuard, UserToken, Permissions]
})
export class AppRoutingModule { }
