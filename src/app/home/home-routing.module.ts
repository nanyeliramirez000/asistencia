import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home.page';

const routes: Routes = [
  {
    path: '',
    // component: HomePage,
    children: [
      {path: '',        component: HomePage},
      {path: 'gestion', component: HomePage},
      {path: 'controls',component: HomePage},
      {path: 'gestor',  component: HomePage},
      {path: 'infos',   component: HomePage},
      {path: 'indicadores', component: HomePage},
      {path: 'vista',   component: HomePage},
      {path: 'reporte', component: HomePage},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
