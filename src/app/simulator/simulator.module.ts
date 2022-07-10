import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SimulatorPageRoutingModule } from './simulator-routing.module';

import { SimulatorPage } from './pages/simulator.page';
import { DetailPage } from './pages/detail/detail.page';
import { ServicesModule } from '../shared/services/services.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SimulatorPageRoutingModule,
    ServicesModule,
  ],
  declarations: [SimulatorPage, DetailPage],
})
export class SimulatorPageModule {}
