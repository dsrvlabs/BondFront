import { Component } from '@angular/core';
import * as nearAPI from 'near-api-js';
// import the WindowRef provider
import { WindowRef } from './WindowRef';
import { NearService } from './near.service';
import { from, Observable } from 'rxjs';
import { catchError, delay, distinct, retryWhen } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

@Component({
  selector: 'dsrv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    NearService,
    { provide: 'applicationName', useValue: 'bToken' },
    { provide: 'contractName', useValue: 'btoken.dsrvlabs.testnet' },
  ],
})
export class AppComponent {
  title = 'BondToken';
  tbalance = '';
  totalSupply = '';
  ntbamount = '1';
  btnamount = '1';

  constructor(private Near: NearService) { }

  // tslint:disable-next-line: use-lifecycle-interface
  async ngOnInit(): Promise<void> {
    await this.Near.init();
    await this.Near.tokenBalance();
    await this.Near.getTotalSupply();
    this.totalSupply = this.Near.totalSupply;
    this.tbalance = this.Near.tbalance;
    console.log(this.totalSupply);
    console.log(this.tbalance);
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

  connected(): boolean {
    return this.Near.isConnected();
  }

  async tokenize(): Promise<void> {
    await this.Near.tokenize(this.ntbamount);
    await this.Near.tokenBalance();
    this.tbalance = this.Near.tbalance;
  }

  async burn(): Promise<void> {
    console.log('burn');
    await this.Near.tokenBalance();
    this.tbalance = this.Near.tbalance;
  }
}
