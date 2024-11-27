import { Entity, PrimaryColumn, Generated, Column } from 'typeorm';
@Entity() // Declares the class as an entity
export class Card {
  @PrimaryColumn({ type: 'uuid' }) // Generate uuid
  @Generated('uuid')
  id: string;

  @Column() // id of the account owner
  userId: string;

  @Column() // token of the card number
  cardToken: string;

  @Column() // visa, mastercard, etc
  last4digits: string;

  @Column() // expiration date
  expDate: string;

  @Column() // it could be debit or credit
  cardType: string;

  @Column() // visa, mastercard, etc
  cardName: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column()
  state: string;

  @Column()
  zipcode: string;

  @Column()
  nickName: string;

  @Column()
  preference: string;

  @Column()
  note: string;
}
