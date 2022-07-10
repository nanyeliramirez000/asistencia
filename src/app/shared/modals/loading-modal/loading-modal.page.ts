import { Component, HostListener, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-loading-modal',
  templateUrl: './loading-modal.page.html',
  styleUrls: ['./loading-modal.page.scss'],
})
export class LoadingModalPage implements OnInit {
  screenHeight: any;
  API_URL = environment.API_URL;

  constructor() {}

  ngOnInit() {
    this.screenHeight = window.innerHeight;
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
