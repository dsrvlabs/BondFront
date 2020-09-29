import { Component, OnInit } from '@angular/core';
import { NearService } from '../near.service';

@Component({
  selector: 'dsrv-nty',
  templateUrl: './nfy.component.html',
  styleUrls: ['./nfy.component.scss'],
  providers: [
    NearService,
    { provide: 'applicationName', useValue: 'btoken' },
    { provide: 'contractName', useValue: 'btoken.dsrvlabs.testnet' },
  ],
})
export class NfyComponent implements OnInit {
  amount: string;
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

  connectWallet(): void {
    this.Near.connectWallet();
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

  getAmount(amount: string): void {
    this.amount = amount;
  }

  async tokenize(): Promise<void> {
    await this.Near.tokenize(this.amount);
    // await this.Near.tokenBalance();
    // this.tbalance = this.Near.tbalance;
  }
}
