import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';


const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    children:
    [
      {
        path: 'products',
        children:
        [
          {
            path: '',
            loadChildren: () => import('../products/products.module').then(m => m.ProductsPageModule)
          }
        ]
      },
      {
        path: 'beauty-tips',
        children:
        [
          {
            path: '',
            loadChildren: () => import('../beauty-tips/beauty-tips.module').then(m => m.BeautyTipsPageModule),
          },
          {
            path: 'create-tip',
            loadChildren: () => import('../create-tip/create-tip.module').then( m => m.CreateTipPageModule)
          },
        ]
      },
      {
        path: 'menu',
        children:
        [
          {
            path: '',
            loadChildren: () => import('../menu/menu.module').then(m => m.MenuPageModule)
          },
          {
            path: 'manage-account',
            loadChildren: () => import('../manage-account/manage-account.module').then( m => m.ManageAccountPageModule)
          },
          {
            path: 'manage-tips',
            children:
            [
              {
                path: '',
                loadChildren: () => import('../manage-tips/manage-tips.module').then( m => m.ManageTipsPageModule)
              },
              {
                path: 'edit-tip',
                loadChildren: () => import('../edit-tip/edit-tip.module').then( m => m.EditTipPageModule)
              },
            ]
            
          },
        ]
      },
      {
        path: '',
        redirectTo: '/home/products',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home/products',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
