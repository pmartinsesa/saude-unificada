import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { BlockchainInstance } from 'src/types';
import { Web3BaseRequest } from 'src/Models/web3BaseRequest';
import { AddMedicalRecordRequest } from 'src/Models/addMedicalRecordRequest';
import { GetAllowedPatientsRequest } from 'src/Models/getAllowedPatientsRequest';

import { Web3Service } from './web3.service';
import { Crypter } from 'src/Functions/crypter';

import { File } from 'web3.storage';
import { v4 as uuid } from 'uuid';

@Injectable()
export class MedicalService {
  private key: string;

  constructor(
    private readonly web3Service: Web3Service,
    private readonly crypter: Crypter,
    private readonly config: ConfigService,
  ) {
     this.key = this.config.get<string>('cryptoKey');
  }

  public async requestPatientAccess(
    web3BaseRequest: Web3BaseRequest,
  ): Promise<any> {
    const contract = this.web3Service.getSmartContractInstance();

    const response = await contract.methods
      .requestAccess(
        web3BaseRequest.patientsWallet,
        web3BaseRequest.doctorWallet,
      )
      .send({ from: web3BaseRequest.patientsWallet });

    return response;
  }

  public async getPatients(
    getAllowedPatientsRequest: GetAllowedPatientsRequest,
  ): Promise<Array<string>> {
    const contract = this.web3Service.getSmartContractInstance();

    const patientsWallets = (await contract.methods
      .getAllAuthorizedPacientsByDoctor(getAllowedPatientsRequest.doctorWallet)
      .call({ from: getAllowedPatientsRequest.doctorWallet })) as Array<string>;

    return patientsWallets;
  }

  public async getRecords(
    web3BaseRequest: Web3BaseRequest,
  ): Promise<Array<string>> {
    const contract = this.web3Service.getSmartContractInstance();

    const medicalRecords = (await contract.methods
      .getMedicalRecords([
        web3BaseRequest.patientsWallet,
        web3BaseRequest.doctorWallet,
      ])
      .call()) as Array<string>;

    return medicalRecords;
  }

  public async addRecord(
    addRecordRequest: AddMedicalRecordRequest,
  ): Promise<any> {
    const blockchainRecord = await this.postOnIPFS(addRecordRequest);

    const contract = this.web3Service.getSmartContractInstance();
    const response = await contract.methods
      .addMedicalRecord(
        addRecordRequest.patientsWallet,
        addRecordRequest.doctorWallet,
        JSON.stringify(blockchainRecord),
      )
      .send({ from: addRecordRequest.doctorWallet, gas: 300000 });

    return response;
  }

  private async postOnIPFS(
    addRecordRequest: AddMedicalRecordRequest,
  ): Promise<BlockchainInstance> {
    const client = this.web3Service.createWeb3StorageContract();
    const clientRecord = this.crypter.encrypt(this.key, JSON.stringify(addRecordRequest.record));

    const fileName = `${addRecordRequest.patientsWallet}-${uuid()}.json`;

    const file = [
      new File([clientRecord], fileName, { type: 'application/json' }),
    ];
    const cid = await client.put(file);

    return {
      cid,
      fileName,
    };
  }
}
