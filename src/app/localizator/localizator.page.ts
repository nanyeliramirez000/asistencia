import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Generate from 'src/app/shared/class/generate.class';

@Component({
  selector: 'app-localizator',
  templateUrl: './localizator.page.html',
  styleUrls: ['./localizator.page.scss'],
})
export class LocalizatorPage implements OnInit {
  API_URL = environment.API_URL;
  generate: Generate;
  constructor(private modalCtrl: ModalController, private router: Router) {
    this.generate = new Generate('localizatorioxkyhgeyb');
  }

  ngOnInit() {
    const isOk = localStorage.getItem('isOk');
    if (!isOk || isOk !== 'true') {
      this.router.navigate(['/comparador']);
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
