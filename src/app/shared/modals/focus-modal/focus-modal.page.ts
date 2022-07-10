import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-focus-modal',
  templateUrl: './focus-modal.page.html',
  styleUrls: ['./focus-modal.page.scss'],
})
export class FocusModalPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async closeModal(){
    await this.modalCtrl.dismiss(false);
  }

}
