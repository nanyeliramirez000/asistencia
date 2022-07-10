import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { InitialPage } from './initial/initial.page';
import { P404Page } from './p404/p404.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'init',
    pathMatch: 'full',
  },
  {
    path: 'init',
    component: InitialPage,
  },
  {
    path: 'initial',
    component: InitialPage,
  },

  {
    path: 'simulator',
    loadChildren: () =>
      import('./simulator/simulator.module').then((m) => m.SimulatorPageModule),
  },
  {
    path: 'simulador',
    loadChildren: () =>
      import('./simulator/simulator.module').then((m) => m.SimulatorPageModule),
  },
  {
    path: 'comparador',
    loadChildren: () =>
      import('./simulator/simulator.module').then((m) => m.SimulatorPageModule),
  },

  {
    path: 'logokodrzfzps',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'iniciojjzmqpjzio',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'ingresoioxkyhgeyb',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },

  {
    path: 'homedgdcrersfu',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'tablerorstgdtcgob',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'centralqgfneaekjq',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },

  {
    path: 'indicatorsioxkyhgeyb',
    loadChildren: () =>
      import('./indicators/indicators.module').then(
        (m) => m.IndicatorsPageModule
      ),
  },
  {
    path: 'indicacionesioxkyhgeyb',
    loadChildren: () =>
      import('./indicators/indicators.module').then(
        (m) => m.IndicatorsPageModule
      ),
  },
  {
    path: 'indicadorioxkyhgeyb',
    loadChildren: () =>
      import('./indicators/indicators.module').then(
        (m) => m.IndicatorsPageModule
      ),
  },

  {
    path: 'geoioxkyhgeyb',
    loadChildren: () =>
      import('./localizator/localizator.module').then(
        (m) => m.LocalizatorPageModule
      ),
  },
  {
    path: 'localizatorioxkyhgeyb',
    loadChildren: () =>
      import('./localizator/localizator.module').then(
        (m) => m.LocalizatorPageModule
      ),
  },
  {
    path: 'locationsioxkyhgeyb',
    loadChildren: () =>
      import('./localizator/localizator.module').then(
        (m) => m.LocalizatorPageModule
      ),
  },
  {
    path: 'successqtkmmixwsh',
    loadChildren: () =>
      import('./success/success.module').then((m) => m.SuccessPageModule),
  },
  {
    path: 'infoioxkyhgeyb',
    loadChildren: () =>
      import('./information/information.module').then(
        (m) => m.InformationPageModule
      ),
  },
  {
    path: 'informationioxkyhgeyb',
    loadChildren: () =>
      import('./information/information.module').then(
        (m) => m.InformationPageModule
      ),
  },
  {
    path: 'p404',
    component: P404Page,
  },

  {
    path: 'splashzerhohkdrp',
    loadChildren: () =>
      import('./splash/splash.module').then((m) => m.SplashPageModule),
  },
  {
    path: 'loadingihaiyqjcwo',
    loadChildren: () =>
      import('./splash/splash.module').then((m) => m.SplashPageModule),
  },
  {
    path: 'initialqqlrzdcmjw',
    loadChildren: () =>
      import('./splash/splash.module').then((m) => m.SplashPageModule),
  },

  {
    path: '**',
    component: InitialPage,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
