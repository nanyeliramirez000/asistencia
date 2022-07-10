import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndicatorsPage } from './indicators.page';

const routes: Routes = [
  {
    path: '',
    // component: IndicatorsPage
    children: [
      {path: '',        component: IndicatorsPage},
      {path: 'gestion', component: IndicatorsPage},
      {path: 'controls',component: IndicatorsPage},
      {path: 'gestor',  component: IndicatorsPage},
      {path: 'infos',   component: IndicatorsPage},
      {path: 'indicadores', component: IndicatorsPage},
      {path: 'vista',   component: IndicatorsPage},
      {path: 'reporte', component: IndicatorsPage},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndicatorsPageRoutingModule {}
