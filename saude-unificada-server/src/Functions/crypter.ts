import { Injectable } from '@nestjs/common';

import * as CryptoJS from 'crypto-js';

@Injectable()
export class Crypter {
  public encrypt(key: any, value: string): string {
    key = CryptoJS.enc.Utf8.parse(key);
    const ciphertext = CryptoJS.AES.encrypt(value, key, { iv: key }).toString();
    return ciphertext;
  }

  public decrypt(key: any, value: string): string {
    key = CryptoJS.enc.Utf8.parse(key);
    const decryptedData = CryptoJS.AES.decrypt(value, key, {
      iv: key,
    });
    return decryptedData.toString(CryptoJS.enc.Utf8);
  }
}
