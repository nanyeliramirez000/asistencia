import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sheet-modal',
  templateUrl: './sheet-modal.page.html',
  styleUrls: ['./sheet-modal.page.scss'],
})
export class SheetModalPage implements OnInit {
  current: string;
  API_URL = environment.API_URL;

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams
  ) {}

  ngOnInit() {
    // console.table(this.navParams);
    this.current = this.navParams.data.current;
  }

  async close() {
    // this.modalCtrl.dismiss();
    await this.modalCtrl.dismiss(false);
  }
}
