import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './pages/login.page';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: LoginPage },
      { path: 'banca', component: LoginPage },
      { path: 'linea', component: LoginPage },
      { path: 'info', component: LoginPage },
      { path: 'gestor', component: LoginPage },
      { path: 'consumo', component: LoginPage },
      { path: 'convenio', component: LoginPage },
      { path: 'canal', component: LoginPage },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
