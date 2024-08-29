import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncomeProfitTableComponent } from './_components/income-profit-table/income-profit-table.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: IncomeProfitTableComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
