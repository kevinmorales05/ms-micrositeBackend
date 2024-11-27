import * as CryptoJS from 'crypto-js';

export function decrypt(token: string, secretKey: string) {
  try {
    console.log('token ', token);

    const bytes = CryptoJS.AES.decrypt(token, secretKey);

    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);

    const info = JSON.parse(decryptedString);
    console.log('deciphered info ', info);

    return info;
  } catch (error) {
    console.error('Decryption failed:', error);
    return null;
  }
}
