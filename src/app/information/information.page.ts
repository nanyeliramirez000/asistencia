import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import Generate from 'src/app/shared/class/generate.class';

@Component({
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss'],
})
export class InformationPage implements OnInit {
  generate: Generate;
  constructor(private modalCtrl: ModalController) {
    this.generate = new Generate('infoioxkyhgeyb');
  }

  ngOnInit() {
    this.endLoading();
  }

  ionViewWillEnter() {
    this.endLoading();
  }

  private async endLoading() {
    let counter = 0;
    let opened: any = this.modalCtrl.getTop();

    while (!opened || !opened.__zone_symbol__value) {
      await this.sleep(2000);
      opened = this.modalCtrl.getTop();
      counter++;
      if (counter > 10) {
        break;
      }
    }

    if (counter < 10) {
      await this.modalCtrl.dismiss();
    }
  }

  private sleep(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}
