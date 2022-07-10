import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './pages/login.page';
import { ServicesModule } from '../shared/services/services.module';

// import { SheetModalPage }   from '../shared/modals/sheet-modal/sheet-modal.page';
// import { InfoModalPage }    from '../shared/modals/info-modal/info-modal.page';
// import { LoadingModalPage } from '../shared/modals/loading-modal/loading-modal.page';
// import { DualModalPage }    from '../shared/modals/dual-modal/dual-modal.page';
import { ModalModule } from '../shared/modals/modal.module';
// SheetModalPage, 
//     InfoModalPage, 
//     LoadingModalPage,
//     DualModalPage

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    ServicesModule,
    ModalModule
  ],
  declarations: [
    LoginPage, 
    
  ]
})
export class LoginPageModule {}
