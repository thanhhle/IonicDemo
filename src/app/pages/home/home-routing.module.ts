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
        path: 'product-categories',
        children:
        [
          {
            path: '',
            loadChildren: () => import('../products-tab/product-categories/product-categories.module').then(m => m.ProductCategoriesPageModule)
          },
          {
            path: ':id',
            children:
            [
              {
                path: '',
                loadChildren: () => import('../products-tab/products/products.module').then(m => m.ProductsPageModule)
              },
            ]   
          },
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
          {
            path: 'my-cart',
            loadChildren: () => import('../me-tab/my-cart/my-cart.module').then( m => m.MyCartPageModule)
          },
        ]
      },
      {
        path: 'add-product',
        loadChildren: () => import('../products-tab/add-product/add-product.module').then( m => m.AddProductPageModule)
      },
      {
        path: '',
        redirectTo: '/home/product-categories',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home/product-categories',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
