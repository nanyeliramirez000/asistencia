import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimulatorPage } from './pages/simulator.page';
import { DetailPage } from './pages/detail/detail.page';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: SimulatorPage },

      { path: 'details/:bank', component: DetailPage },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SimulatorPageRoutingModule {}
