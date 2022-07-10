import { Component, HostListener, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.page.html',
  styleUrls: ['./info-modal.page.scss'],
})
export class InfoModalPage implements OnInit {
  screenHeight: any;
  API_URL = environment.API_URL;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.screenHeight = window.innerHeight;
  }

  async closeModal() {
    // this.modalCtrl.dismiss();
    localStorage.setItem('showAviso', 'no');
    await this.modalCtrl.dismiss(false);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenHeight = window.innerHeight;
  }

  getVhPx(porcent: number): string {
    let height: number = this.screenHeight as number;
    return `${(porcent * height) / 100}px`;
  }

  getSubVhPx(data: { main: number; sub: number }): string {
    let height: number = this.screenHeight as number;
    let currentP: number = (data.main * height) / 100;
    return `${(data.sub * currentP) / 100}px`;
  }
}
