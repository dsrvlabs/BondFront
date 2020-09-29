import { Component } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NearService } from './near.service';

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
  ntbamount = '10';
  btnamount = '0';

  constructor(private Near: NearService) { }

  // tslint:disable-next-line: use-lifecycle-interface
  async ngOnInit(): Promise<void> {
    await this.Near.init();
    await this.Near.tokenBalance();
    await this.Near.getTotalSupply();
    this.totalSupply = this.Near.totalSupply;
    this.tbalance = this.Near.tbalance;
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
