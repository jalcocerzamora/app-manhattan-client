import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'projects/core/helpers';
import { NotFoundComponent } from './components';
import { HomeComponent, MenuComponent, ShopcartComponent } from './pages';


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
    // children: [
    //   {
    //     path: '',
    //     children: [
    //       {
    //         path: 'searchresults',
    //         component: SearchResultsComponent,
    //         canActivate: [AuthGuard],
    //         data: { auth: 'VIEW_ONLY' },
    //         resolve: { searchResults: SearchResultsResolver }
    //       },
    //     ]
    //   }
    // data: {
    //   title: 'Menu'
    // }
  },
  {
    path: 'shopcart', component: ShopcartComponent,
    canActivate: [AuthGuard],
  },
  // {
  //   path: 'shopcart', component: ShopCartComponent,
  //   data: {
  //     title: 'ShopCart'
  //   }
  // },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
