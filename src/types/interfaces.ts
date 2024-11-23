export interface cardholderard {
  name: string;

  // id of the account owner
  userId: string;

  // token of the card number
  cardToken: string;

  // visa, mastercard, etc
  last4digits: string;

  // expiration date
  expDate: string;

  // it could be debit or credit
  cardType: string;

  // visa, mastercard, etc
  cardName: string;

  city: string;

  country: string;

  state: string;

  zipcode: string;

  line1: string;

  line2: string;

  cvv: string;

  nickName: string;

  note: string;
}
export interface CypheredCard {
  cypheredPayload: string;
  service: string;
}
