import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { BlockchainInstance, MedicalRecord } from 'src/types';

import { Crypter } from './crypter';

import axios from 'axios';

@Injectable()
export class RecordParser {
  private key: string;

  constructor(
    private readonly crypter: Crypter,
    private readonly config: ConfigService,
  ) {
    this.key = this.config.get<string>('cryptoKey');
  }

  public async parse(blockchainInstance: string[]): Promise<MedicalRecord[]> {
    return await Promise.all(
      blockchainInstance.map(
        async (stringfiedBlockInstance: string) =>
          await this.convertMedicalRecords(stringfiedBlockInstance),
      ),
    );
  }

  private async convertMedicalRecords(
    stringfiedBlockInstance: string,
  ): Promise<MedicalRecord> {
    const blockInstance = JSON.parse(
      stringfiedBlockInstance,
    ) as BlockchainInstance;

    const response = await axios.get(
      `https://${blockInstance.cid}.ipfs.w3s.link/${blockInstance.fileName}`,
    );

    const medicalData = this.crypter.decrypt(this.key, response.data);
    return JSON.parse(medicalData) as MedicalRecord;
  }
}
