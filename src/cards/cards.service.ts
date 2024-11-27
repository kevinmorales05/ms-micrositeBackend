import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CreateCardCypheredDto } from './dto/create-card-cyphered.dto';

import { decrypt, encrypt } from 'src/utils/cypher';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { addCardResponse } from 'src/types/responses';

const secretKey = 'mySecretKey12345';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
  ) {}
  async createCypher(
    createCardDto: CreateCardCypheredDto,
  ): Promise<addCardResponse> {
    console.log('received cyphered: ', createCardDto);
    console.log('received cyphered service: ', createCardDto.service);
    console.log('received cyphered token: ', createCardDto.cypheredPayload);

    //decypher data
    const decriptedData = decrypt(createCardDto.cypheredPayload, secretKey);
    console.log('decripted data> ', decriptedData);
    if (decriptedData === null) {
      return {
        service: 'addCard',
        error: `Error decripting information`,
      };
    }
    //determine  the type of the card

    //validate if the data is correct in visa or mastercard

    //tokenize the card number

    //create the card
    const newCard = new Card();
    //add the information to the card
    newCard.cardName = decriptedData.cardName;
    newCard.cardToken = decriptedData.cardToken;
    newCard.last4digits = decriptedData.last4digits;
    newCard.cardType = decriptedData.cardType;
    newCard.city = decriptedData.city;
    newCard.country = decriptedData.country;
    newCard.expDate = decriptedData.expDate;
    newCard.nickName = decriptedData.nickName;
    newCard.note = decriptedData.note;
    newCard.state = decriptedData.state;
    newCard.userId = decriptedData.userId;
    newCard.zipcode = decriptedData.zipcode;
    console.log('new card ', newCard);
    //persist the card in the database
    try {
      await this.cardRepository.save(newCard);
      //cypher the response again
      const succefullResponse = {
        message: 'Card created successfully!',
        code: '01',
        cardCreated: {
          cardToken: newCard.cardToken,
          cardType: newCard.cardType,
          cardName: newCard.cardName,
          cardLast4Digits: newCard.last4digits,
        },
      };
      //return a succesful message
      return {
        service: 'addCard',
        cypheredResponse: encrypt(succefullResponse, secretKey),
      };
    } catch (error) {
      console.log('error saving the user ', error);
      //return error message if it is an error
      return {
        service: 'addCard',
        error: `Error saving the card: ${error}`,
      };
    }

    //save the card

    // return {
    //   code: '01',
    //   cypheredCard: decriptedData,
    // };
  }
  create(createCardDto: CreateCardDto) {
    return 'This action adds a new card';
  }
  findAll() {
    return `This action returns all cards`;
  }

  findOne(id: number) {
    return `This action returns a #${id} card`;
  }

  update(id: number, updateCardDto: UpdateCardDto) {
    return `This action updates a #${id} card`;
  }

  remove(id: number) {
    return `This action removes a #${id} card`;
  }
}
