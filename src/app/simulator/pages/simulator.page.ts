import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.page.html',
  styleUrls: ['./simulator.page.scss'],
})
export class SimulatorPage implements OnInit {
  public ifSkeletum: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  loadSkeletum() {
    this.ifSkeletum = true;
    setTimeout(() => {
      this.ifSkeletum = false;
    }, 1000);
  }

  goToSimular(bank: string) {}
}
