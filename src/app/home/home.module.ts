import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './pages/home.page';

import { HomePageRoutingModule } from './home-routing.module';

// import { LoadingModalPage } from '../shared/modals/loading-modal/loading-modal.page';
// import { FocusModalPage }   from '../shared/modals/focus-modal/focus-modal.page';
import { ModalModule } from '../shared/modals/modal.module';
import { HttpClientModule } from '@angular/common/http';
import { ServicesModule } from '../shared/services/services.module';
// , LoadingModalPage, FocusModalPage

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HttpClientModule,
    ModalModule,
    ServicesModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
