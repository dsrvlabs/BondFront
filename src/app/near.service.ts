import { Inject, Injectable, Optional } from '@angular/core';
import * as nearAPI from 'near-api-js';
import { WalletConnection, utils } from 'near-api-js';
import Big from 'big.js';
import BN from 'bn.js';

interface IUSER {
  accountId: string;
  balance: any;
}

const DEPOSIT_OF_GAS = new BN('1000000000000000000').toString();

@Injectable({
  providedIn: 'root'
})
export class NearService {
  nearConfig = {
    networkId: 'default',
    nodeUrl: 'https://rpc.testnet.near.org',
    contractName: '',
    walletUrl: 'https://wallet.testnet.near.org',
    helperUrl: 'https://helper.testnet.near.org'
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
    console.log(this.nearConfig.contractName);
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
      console.log(err);
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
    // const bufferOriginal = Buffer.from({}.toString());
    // console.log(DEPOSIT_OF_GAS);
    // console.log(Big(amount || '0').times(10 ** 24).toFixed());

    // console.log(new BN('10e+24').toString());
    const AMOUNT = new BN(amount || '0').muln(10).muln(24).toString();
    await this.contract.deposit({}, DEPOSIT_OF_GAS, Big(amount || '0').times(10 ** 24).toFixed());
  }

  isConnected(): boolean {
    return this.currentUser.accountId.length > 0;
  }
}
