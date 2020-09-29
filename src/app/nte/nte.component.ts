import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NearService } from '../near.service';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'dsrv-nte',
  templateUrl: './nte.component.html',
  styleUrls: ['./nte.component.scss'],
  providers: [
    NearService,
    { provide: 'applicationName', useValue: 'btoken.dsrvlabs.testnet' },
    { provide: 'contractName', useValue: 'btoken.dsrvlabs.testnet' },
  ],
})
export class NteComponent implements OnInit {
  amount: string;
  address: string;
  tbalance = '';

  constructor(private Near: NearService, private route: ActivatedRoute, private http: HttpClient) { }

  async ngOnInit(): Promise<void> {
    await this.Near.init();
    await this.Near.tokenBalance();
    await this.Near.getTotalSupply();
    this.tbalance = this.Near.tbalance;
    // tslint:disable-next-line: no-string-literal
    this.address = this.route.children[0].snapshot.params['address'];
    // tslint:disable-next-line: no-string-literal
    const tempAmount = this.route.children[0].snapshot.params['amount'];
    if (this.address != null || tempAmount != null) {
      const nearAcc = this.accountId();
      const stream$ = this.http.get(`near2eth/${nearAcc}/0/${tempAmount}/${this.address}`, { "responseType": "text" });
      stream$.subscribe((txid: string) => {
        console.log(`https://rinkeby.etherscan.io/tx/${txid}`);
      });
    }
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

  getAddress(address: string): void {
    this.address = address;
  }

  async transfer(): Promise<void> {
    await this.Near.transfer(this.amount);
    // console.log(this.address);
  }
}
