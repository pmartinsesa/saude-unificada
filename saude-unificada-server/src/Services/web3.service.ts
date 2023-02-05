import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

import { Web3Storage } from 'web3.storage';
import Web3 from 'web3';

@Injectable()
export class Web3Service {
  constructor(private readonly config: ConfigService) {}

  public getSmartContractInstance(): any {
    const web3 = new Web3(this.config.get<string>('web3Url'));
    const contractInstanceAddress = this.config.get<string>('smartContractAddress');
    const abi = JSON.parse(this.config.get<any>('abi'));

    const contract = new web3.eth.Contract(abi, contractInstanceAddress);

    return contract;
  }

  public createWeb3StorageContract(): Web3Storage {
    return new Web3Storage({ token: this.config.get<any>('web3StorageToken') })
  }
}
