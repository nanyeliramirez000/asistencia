import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SheetModalPage } from './sheet-modal/sheet-modal.page';
import { InfoModalPage } from './info-modal/info-modal.page';
import { LoadingModalPage } from './loading-modal/loading-modal.page';
import { DualModalPage } from './dual-modal/dual-modal.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [
    SheetModalPage, 
    InfoModalPage, 
    LoadingModalPage,
    DualModalPage
  ],
  exports: [
    SheetModalPage, 
    InfoModalPage, 
    
    DualModalPage
  ],
})
export class ModalModule {}
