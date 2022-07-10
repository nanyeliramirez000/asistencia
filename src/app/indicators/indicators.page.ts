import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import Generate from 'src/app/shared/class/generate.class';

@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.page.html',
  styleUrls: ['./indicators.page.scss'],
})
export class IndicatorsPage implements OnInit {
  generate: Generate;
  constructor(private modalCtrl: ModalController, private router: Router) {
    this.generate = new Generate('indicadorioxkyhgeyb');
  }

  ngOnInit() {
    const isOk = localStorage.getItem('isOk');
    if (!isOk || isOk !== 'true') {
      this.router.navigate(['/information']);
    }
    this.endLoading();
  }

  ionViewWillEnter() {
    this.endLoading();
  }

  private async endLoading() {
    let counter = 0;
    let opened: any = this.modalCtrl.getTop();

    while (!opened || !opened.__zone_symbol__value) {
      // console.log("Estado => ", opened.__zone_symbol__value);
      await this.sleep(2000);
      opened = this.modalCtrl.getTop();
      counter++;
      // console.log(counter);
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
