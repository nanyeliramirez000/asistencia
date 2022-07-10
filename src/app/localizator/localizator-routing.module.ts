import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocalizatorPage } from './localizator.page';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '',        component: LocalizatorPage},
      {path: 'gestion', component: LocalizatorPage},
      {path: 'controls',component: LocalizatorPage},
      {path: 'gestor',  component: LocalizatorPage},
      {path: 'infos',   component: LocalizatorPage},
      {path: 'indicadores', component: LocalizatorPage},
      {path: 'vista',   component: LocalizatorPage},
      {path: 'reporte', component: LocalizatorPage},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocalizatorPageRoutingModule {}
