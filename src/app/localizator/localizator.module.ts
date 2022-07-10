import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocalizatorPageRoutingModule } from './localizator-routing.module';

import { LocalizatorPage } from './localizator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocalizatorPageRoutingModule
  ],
  declarations: [LocalizatorPage]
})
export class LocalizatorPageModule {}
