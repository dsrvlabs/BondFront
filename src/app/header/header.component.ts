import { Component, OnInit } from '@angular/core';
import { NearService } from '../near.service';

@Component({
  selector: 'dsrv-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [
    NearService,
    { provide: 'applicationName', useValue: 'btoken.dsrvlabs.testnet' },
    { provide: 'contractName', useValue: 'btoken.dsrvlabs.testnet' },
  ],
})
export class HeaderComponent implements OnInit {
  tbalance = '';

  constructor(private Near: NearService) { }

  async ngOnInit(): Promise<void> {
    await this.Near.init();
    await this.Near.tokenBalance();
    await this.Near.getTotalSupply();
    this.tbalance = this.Near.tbalance;
  }

  connected(): boolean {
    return this.Near.isConnected();
  }

  async connectWallet(): Promise<void> {
    await this.Near.connectWallet();
  }

  disconnectWallet(): void {
    this.Near.disconnectWallet();
  }

  accountId(): string {
    return this.Near.accountId();
  }

  balance(): string {
    return this.Near.balance();
  }
}
