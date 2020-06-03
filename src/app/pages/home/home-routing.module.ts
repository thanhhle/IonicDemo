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
            loadChildren: () => import('../products-tab/products/products.module').then(m => m.ProductsPageModule)
          },
          {
            path: 'ready-to-wear',
            loadChildren: () => import('../products-tab/ready-to-wear/ready-to-wear.module').then( m => m.ReadyToWearPageModule)
          },
          {
            path: 'bags',
            loadChildren: () => import('../products-tab/bags/bags.module').then( m => m.BagsPageModule)
          },
          {
            path: 'accessories',
            loadChildren: () => import('../products-tab/accessories/accessories.module').then( m => m.AccessoriesPageModule)
          }
        ]
      },
      {
        path: 'beauty-tips',
        children:
        [
          {
            path: '',
            loadChildren: () => import('../beauty-tips-tab/beauty-tips/beauty-tips.module').then(m => m.BeautyTipsPageModule),
          },
          {
            path: 'create-tip',
            loadChildren: () => import('../beauty-tips-tab/create-tip/create-tip.module').then( m => m.CreateTipPageModule)
          },
        ]
      },
      {
        path: 'menu',
        children:
        [
          {
            path: '',
            loadChildren: () => import('../me-tab/menu/menu.module').then(m => m.MenuPageModule)
          },
          {
            path: 'my-account',
            loadChildren: () => import('../me-tab/my-account/my-account.module').then( m => m.MyAccountPageModule)
          },
          {
            path: 'my-tips',
            children:
            [
              {
                path: '',
                loadChildren: () => import('../me-tab/my-tips/my-tips.module').then( m => m.MyTipsPageModule)
              },
              {
                path: 'edit-tip/:id',
                loadChildren: () => import('../me-tab/edit-tip/edit-tip.module').then( m => m.EditTipPageModule)
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
