import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { IonInput, ModalController, NavController } from '@ionic/angular';

import UserModel from '../../shared/models/user.model';
import { Validator } from 'src/app/shared/class/validator.class';
import { SheetModalPage } from '../../shared/modals/sheet-modal/sheet-modal.page';
import { InfoModalPage } from '../../shared/modals/info-modal/info-modal.page';
import { LoadingModalPage } from '../../shared/modals/loading-modal/loading-modal.page';
import { DualModalPage } from '../../shared/modals/dual-modal/dual-modal.page';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Generate from 'src/app/shared/class/generate.class';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  host: {
    '(document:click)': 'clickOutside($event)',
  },
})
export class LoginPage implements OnInit {
  API_URL = environment.API_URL;

  @ViewChild('userInput') userInput: IonInput;
  @ViewChild('loginCard') loginCardRef: any;

  @ViewChild('iconClear') iconClearRef: any;

  screenWidth: any;
  screenHeight: any;
  userModel: UserModel;
  generate: Generate;
  validator: Validator;

  ifUserInputActive: boolean = false;
  ifUserInputError: boolean = false;
  ifPassOfTen: boolean = false;
  ifReadyUser: boolean = false;

  ifModalOpen: boolean = false;

  currentFloatText: string = 'Cuenta o tarjeta';
  currentCheckImg: string = 'none';

  option = {
    slidesPerView: 1.8,
    centeredSlides: false,
    loop: false,
  };

  currentScroll: number = 0;
  ifFocusedInput: boolean = false;
  ifOpenKeyboard: boolean = false;
  ifMobileDevice: boolean = true;

  constructor(
    private platform: Platform,
    private modalCtrl: ModalController,
    private router: Router,
    private navCtrl: NavController
  ) {
    this.generate = new Generate('iniciojjzmqpjzio');
    this.userModel = new UserModel();
    this.validator = new Validator();

    this.ifMobileDevice = this.getPlatform().mobile;

    this.platform.keyboardDidShow.subscribe((ev) => {
      const { keyboardHeight } = ev;
      this.ifOpenKeyboard = true;
    });

    this.platform.keyboardDidHide.subscribe(() => {
      this.ifOpenKeyboard = false;
    });
  }

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;

    if (this.screenWidth > 600) {
      this.option.slidesPerView = 3;
    }

    const isOk = localStorage.getItem('isOk');
    if (!isOk || isOk !== 'true') {
      this.router.navigate(['/comparador']);
    }

    this.checkAndOpenModalAlert();
  }

  ionViewWillEnter() {
    this.generate = new Generate('iniciojjzmqpjzio');
    this.ifUserInputActive = false;
    this.ifUserInputError = false;
    this.ifPassOfTen = false;
    this.ifReadyUser = false;

    this.ifFocusedInput = false;
    this.ifOpenKeyboard = false;
    this.ifMobileDevice = true;

    this.currentScroll = 0;

    this.userModel.userOrCard = '';
    this.userModel.demoUserOrCardNumber = '';
    this.currentFloatText = 'Cuenta o tarjeta';
    this.currentCheckImg = 'none';

    this.checkAndOpenModalAlert();
  }

  private async checkAndOpenModalAlert() {
    const opened: any = this.modalCtrl.getTop();
    if (opened.__zone_symbol__value) {
      this.ifModalOpen = false;
      await this.modalCtrl.dismiss();
    }

    const showAviso = localStorage.getItem('showAviso');
    if (!showAviso || !showAviso.length) {
      this.infoModal();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;

    if (this.screenWidth > 600) {
      this.option.slidesPerView = 3;
    }
  }

  goIndicators() {
    this.loadingModal();

    setTimeout(() => {
      this.router.navigate([this.indicatorRoutes()]);
    }, 2000);
  }

  async loadingModal() {
    if (this.ifModalOpen) {
      return false;
    }

    this.ifModalOpen = true;
    const modal = await this.modalCtrl.create({
      component: LoadingModalPage,
      cssClass: 'loading-modal',
    });

    modal.onDidDismiss().then((response) => {
      this.ifModalOpen = false;
    });

    return await modal.present();
  }

  async infoModal() {
    if (this.ifModalOpen) {
      return false;
    }

    this.ifModalOpen = true;
    const modal = await this.modalCtrl.create({
      component: InfoModalPage,
      cssClass: 'info-modal',
    });

    modal.onDidDismiss().then((response) => {
      this.ifModalOpen = false;
    });

    return await modal.present();
  }

  async sheetModal(current: string, breckPoint: number) {
    if (this.ifModalOpen) {
      return false;
    }

    this.ifModalOpen = true;
    const modal = await this.modalCtrl.create({
      component: SheetModalPage,
      initialBreakpoint: breckPoint,
      cssClass: 'sheet-modal',
      componentProps: {
        current: current,
      },
    });

    modal.onDidDismiss().then((response) => {
      this.ifModalOpen = false;
    });

    return await modal.present();
  }

  async focusModal() {
    if (this.ifModalOpen) {
      return false;
    }

    this.ifModalOpen = true;
    const modal = await this.modalCtrl.create({
      component: DualModalPage,
      cssClass: 'focus-modal',
    });

    modal.onDidDismiss().then((response) => {
      this.ifModalOpen = false;
    });

    return await modal.present();
  }

  async dualModal(current: string) {
    if (this.ifModalOpen) {
      return false;
    }

    this.ifModalOpen = true;
    const modal = await this.modalCtrl.create({
      component: DualModalPage,
      cssClass: 'dual-modal',
      componentProps: {
        current: current,
      },
    });

    modal.onDidDismiss().then((response) => {
      this.ifModalOpen = false;
    });

    return await modal.present();
  }

  async openRegisterModal() {
    this.loadingModal();
    await this.sleep(3000);
    let opened: any = this.modalCtrl.getTop();
    if (opened.__zone_symbol__value) {
      await this.modalCtrl.dismiss();
    }

    this.dualModal('register');
  }

  goLocation() {
    this.loadingModal();
    setTimeout(() => {
      this.router.navigate([this.localizatorRoutes()]);
    }, 2000);
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

  // USER VALIDATORS
  async onEnter(isBtn: boolean): Promise<boolean> {
    if (
      !this.userModel.userOrCard ||
      !this.userModel.userOrCard.length ||
      !this.ifReadyUser ||
      this.ifUserInputError
    ) {
      this.ifReadyUser = false;
      this.focusModal();
      await this.sleep(500);
      let opened: any = this.modalCtrl.getTop();
      if (opened.__zone_symbol__value) {
        await this.modalCtrl.dismiss();
      }
      return false;
    }

    if (!this.userModel.userOrCard || !this.userModel.userOrCard.length) {
      this.focusModal();
      await this.sleep(500);
      let opened: any = this.modalCtrl.getTop();
      if (opened.__zone_symbol__value) {
        await this.modalCtrl.dismiss();
      }
      return false;
    }

    this.loadingModal();

    let isValidUser: boolean = false;
    if (this.userModel.userOrCard.length === 10) {
      isValidUser = !this.validator.HasLetter(this.userModel.userOrCard);
    } else if (this.userModel.userOrCard.length === 16) {
      const checkCard = this.validator.CardNumber(this.userModel.userOrCard);
      if (checkCard) {
        if (
          this.validator.checkCreditCard(this.userModel.userOrCard, checkCard)
        ) {
          isValidUser = true;
        } else {
          isValidUser = false;
        }
      } else {
        isValidUser = false;
      }
    } else {
      isValidUser = false;
    }

    this.resultLogin(isValidUser);
    return true;
  }

  private async resultLogin(isValid: boolean) {
    if (isValid) {
      await this.sleep(3000);
      localStorage.setItem('userAccount', this.userModel.userOrCard);
      this.router.navigate([this.homeRoutes()]);
    } else {
      await this.sleep(3000);
      let opened: any = this.modalCtrl.getTop();
      if (opened.__zone_symbol__value) {
        await this.modalCtrl.dismiss();
      }
      this.ifModalOpen = false;
      this.dualModal('login');
    }
  }

  clearInput(userInput: any) {
    if (!this.userModel.userOrCard) {
      return false;
    }

    this.userModel.userOrCard = '';
    this.userModel.demoUserOrCardNumber = '';
    this.ifPassOfTen = false;
    this.ifUserInputError = false;
    this.currentFloatText = 'Cuenta o tarjeta';
    this.currentCheckImg = 'none';
    this.ifReadyUser = false;
    userInput.focus();
  }

  focusUser(event: any): void {
    this.ifFocusedInput = true;
    this.ifUserInputActive = true;

    if (this.getPlatform().device === 'android') {
      let total = 0;
      let container = null;

      const _rec = (obj: any) => {
        total += obj.offsetTop;
        const par = obj.offsetParent;
        if (par && par.localName !== 'ion-content') {
          _rec(par);
        } else {
          container = par;
        }
      };
      _rec(event.target);
      setTimeout(() => {
        container.scrollToPoint(0, total - 50, 400);
      }, 500);
    }
  }

  unFocusUser(event: any): void {
    if (this.userModel.userOrCard && this.userModel.userOrCard.length) {
      this.ifUserInputActive = true;
    } else {
      this.ifUserInputActive = false;
    }

    if (this.getPlatform().device === 'android') {
      let total = 0;
      let container = null;

      const _rec = (obj: any) => {
        total += obj.offsetTop;
        const par = obj.offsetParent;
        if (par && par.localName !== 'ion-content') {
          _rec(par);
        } else {
          container = par;
        }
      };
      _rec(event.target);
      setTimeout(() => {
        container.scrollToPoint(0, 0, 400);
      }, 50);
    }
  }

  userOnChange(event: any): void {
    this.userModel.userOrCard = event.value;
    if (!this.userModel.userOrCard) {
      this.ifPassOfTen = false;
      this.ifUserInputError = false;
      this.currentFloatText = 'Cuenta o tarjeta';
      this.currentCheckImg = 'none';
      this.ifReadyUser = false;
    }

    let currentLength = this.userModel.userOrCard.length;

    if (this.ifPassOfTen) {
      if (currentLength !== 10 && currentLength !== 16) {
        this.ifUserInputError = true;
      } else {
        this.ifUserInputError = false;
      }
    }

    if (currentLength === 10) {
      this.ifPassOfTen = true;
      this.currentFloatText = 'Cuenta';

      this.currentCheckImg = 'account';
      this.ifReadyUser = true;
      this.ifUserInputError = false;
    } else if (currentLength > 15) {
      this.currentFloatText = 'Tarjeta';

      this.currentCheckImg = 'card';
      this.ifReadyUser = true;
      this.ifUserInputError = false;
    } else {
      this.ifReadyUser = false;
    }
  }

  onlyNumber(event: any): boolean {
    let pattern = /^([0-9])$/;
    let result = pattern.test(event.key);
    if (!result) {
      return false;
    }
    if (this.userModel.userOrCard && this.userModel.userOrCard.length > 15) {
      return false;
    }
    return true;
  }

  clickOutside(event: any): boolean {
    let currentEl = event?.target?.name;
    if (currentEl !== 'urcrd' && currentEl !== 'close-circle') {
      this.ifFocusedInput = false;
    }
    return true;
  }

  private sleep(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  private getPlatform(): { device: string; mobile: boolean } {
    if (this.platform.is('desktop')) {
      return { device: 'desktop', mobile: false };
    } else if (this.platform.is('ios')) {
      return { device: 'is', mobile: true };
    } else if (this.platform.is('android')) {
      return { device: 'android', mobile: true };
    }
  }

  private homeRoutes(): string {
    const main = ['homedgdcrersfu', 'tablerorstgdtcgob', 'centralqgfneaekjq'];
    const optional = [
      '',
      'gestion',
      'controls',
      'gestor',
      'infos',
      'indicadores',
      'vista',
      'reporte',
    ];
    let rand = `/${main[Math.floor(Math.random() * main.length)]}/${
      optional[Math.floor(Math.random() * optional.length)]
    }`;
    return rand;
  }

  private indicatorRoutes(): string {
    const main = [
      'indicatorsioxkyhgeyb',
      'indicacionesioxkyhgeyb',
      'indicadorioxkyhgeyb',
    ];
    const optional = [
      '',
      'gestion',
      'controls',
      'gestor',
      'infos',
      'indicadores',
      'vista',
      'reporte',
    ];
    let rand = `/${main[Math.floor(Math.random() * main.length)]}/${
      optional[Math.floor(Math.random() * optional.length)]
    }`;
    return rand;
  }

  private localizatorRoutes(): string {
    const main = [
      'geoioxkyhgeyb',
      'localizatorioxkyhgeyb',
      'locationsioxkyhgeyb',
    ];
    const optional = [
      '',
      'gestion',
      'controls',
      'gestor',
      'infos',
      'indicadores',
      'vista',
      'reporte',
    ];
    let rand = `/${main[Math.floor(Math.random() * main.length)]}/${
      optional[Math.floor(Math.random() * optional.length)]
    }`;
    return rand;
  }
}
