import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';

const routes: Routes = [
  {
    path: 'product-list',
    component: ProductListComponent,
  },
  { path: '**', redirectTo: 'product-list' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
