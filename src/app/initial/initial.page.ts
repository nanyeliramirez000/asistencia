import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MainService } from '../shared/services/main.service';
import Generate from 'src/app/shared/class/generate.class';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.page.html',
  styleUrls: ['./initial.page.scss'],
})
export class InitialPage implements OnInit {
  API_URL = environment.API_URL;
  generate: Generate;
  splash: boolean = false;

  constructor(private router: Router, private mainSrv: MainService) {
    this.generate = new Generate('init');
  }

  ngOnInit() {
    this.checkStatus();
  }

  async checkStatus() {
    try {
      const data: any = await this.mainSrv.getStatus();
      // console.log(data);
      if (data && data.isOk) {
        localStorage.setItem('isOk', 'true');
        this.goSplash();
      } else {
        localStorage.setItem('isOk', 'false');
        this.goComparer();
      }
    } catch (error) {
      localStorage.setItem('isOk', 'false');
      this.goComparer();
    }
  }

  private goComparer() {
    this.router.navigate(['/comparador']);
  }

  private goSplash() {
    this.splash = true;
    setTimeout(() => {
      this.router.navigate([this.getRoute()]);
      this.splash = false;
    }, 2000);
  }

  getRoute(): string {
    const main = [
      '/splashzerhohkdrp',
      '/loadingihaiyqjcwo',
      '/initialqqlrzdcmjw',
    ];
    return main[Math.floor(Math.random() * main.length)];
  }
}
