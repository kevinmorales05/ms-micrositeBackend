import CryptoJS from 'crypto-js';
//desencriptar token con informacion de detalle de compra
export function decrypt(token: string, secretKey: string) {
  try {
    // Decrypt the token
    const bytes = CryptoJS.AES.decrypt(token, secretKey);

    // Convert decrypted bytes to a UTF-8 string
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);

    // Parse the JSON string back into an object
    const data = JSON.parse(decryptedString);

    //console.log('This is the ciphered data:', token);
    //console.log('Data decrypted:', data);

    return data;
  } catch (error) {
    console.error('Decryption failed:', error);
    return null;
  }
}
