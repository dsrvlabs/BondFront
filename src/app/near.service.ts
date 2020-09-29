import { Inject, Injectable, Optional } from '@angular/core';
import * as nearAPI from 'near-api-js';
import { WalletConnection, utils } from 'near-api-js';
import BN from 'bn.js';

interface IUSER {
  accountId: string;
  balance: any;
}

// 가스가 너무 높아서 안되는 거였음... ㅠㅠ
const DEPOSIT_OF_GAS = new BN('300000000000000');

@Injectable({
  providedIn: 'root'
})
export class NearService {
  nearConfig = {
    networkId: 'testnet',
    nodeUrl: 'https://rpc.testnet.near.org',
    contractName: '',
    walletUrl: 'https://wallet.testnet.near.org',
    helperUrl: 'https://helper.testnet.near.org',
  };

  near: any;
  wallet: WalletConnection;
  currentUser: IUSER = {
    accountId: '',
    balance: undefined
  };
  contract: any;
  tbalance: string;
  totalSupply: string;

  constructor(
    @Inject('applicationName') @Optional() private applicationName: string,
    @Inject('contractName') @Optional() private contractName: string
  ) {
    this.nearConfig.contractName = contractName;
    this.currentUser.accountId = '';
    this.currentUser.balance = '';
  }

  async init(): Promise<void> {
    this.near = await nearAPI.connect({
      deps: {
        keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore()
      },
      ...this.nearConfig
    });

    this.wallet = new nearAPI.WalletConnection(this.near, 'btoken');

    if (this.wallet.getAccountId()) {
      this.currentUser = {
        accountId: this.wallet.getAccountId(),
        balance: (await this.wallet.account().state()).amount
      };
    }

    this.contract = await new nearAPI.Contract(
      this.wallet.account(),
      this.nearConfig.contractName, {
      // View methods are read-only – they don't modify the state, but usually return some value
      viewMethods: ['get_balance', 'get_allowance', 'get_total_supply'],
      // Change methods can modify the state, but you don't receive the returned value when called
      changeMethods: ['deposit', 'burn', 'approve', 'transfer'],
    });
  }

  connectWallet(): void {
    this.wallet.requestSignIn(this.nearConfig.contractName, this.applicationName);
  }

  disconnectWallet(): void {
    this.wallet.signOut();
    this.currentUser = { accountId: '', balance: '' };
  }

  accountId(): string {
    return this.currentUser.accountId;
  }

  balance(): string {
    return this.currentUser.balance;
  }

  async getTotalSupply(): Promise<void> {
    try {
      this.totalSupply = await this.contract.get_total_supply();
    } catch (err) {
      this.totalSupply = '0';
    }
  }

  async tokenBalance(): Promise<void> {
    try {
      this.tbalance = await this.contract.get_balance({ owner_id: this.accountId() });
    } catch {
      this.tbalance = '0';
    }
  }

  async tokenize(amount: string): Promise<void> {
    const tmp = new BN(amount || '0').mul(new BN('10').pow(new BN('24')));
    // console.log(tmp.toString());
    await this.wallet.account().functionCall(this.nearConfig.contractName, 'deposit', undefined, DEPOSIT_OF_GAS, tmp);
    // const receipt = await this.contract.deposit({}, DEPOSIT_OF_GAS, new BN(amount || '0').mul(new BN('10').pow(new BN('24'))));
  }

  async transfer(amount: string): Promise<void> {
    const tmp = new BN(amount || '0');

    await this.contract.transfer({
      // tslint:disable-next-line: object-literal-key-quotes
      'new_owner_id': 'lock.dsrvlabs.testnet',
      // tslint:disable-next-line: object-literal-key-quotes
      'amount': tmp.toString()
    },
      DEPOSIT_OF_GAS,
      new BN('1330000000000000000000000')
    );
  }

  async latestTxid(): Promise<string> {
    const tmp = await this.wallet.account().getAccountDetails();
    console.log(tmp);
    return '';
  }

  isConnected(): boolean {
    return this.currentUser.accountId.length > 0;
  }
}
