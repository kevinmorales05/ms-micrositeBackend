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

    //find other card with the preference = 1 and update
    const changePreference = await this.cardRepository.findOneBy({
      preference: '1',
      userId: decriptedData.userId,
    });
    if (changePreference !== null) {
      console.log('Found another prefered card');
      changePreference.preference = '0';
      await this.cardRepository.save(changePreference);
    } else {
      console.log('no previous cards!');
    }
    //update the status of the last card to 0, it means it is not prefered

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
    newCard.preference = '1'; //it is the prefered by default
    console.log('new card ', newCard);
    //persist the card in the database
    try {
      const cardAdded = await this.cardRepository.save(newCard);
      //cypher the response again
      const succefullResponse = {
        message: 'Card created successfully!',
        code: '01',
        cardCreated: {
          cardToken: newCard.cardToken,
          cardType: newCard.cardType,
          cardName: newCard.cardName,
          cardLast4Digits: newCard.last4digits,
          id: cardAdded.id,
        },
      };
      console.log('successResponse ', succefullResponse);
      //return a succesful message
      return {
        service: 'addCard',
        cypheredResponse: encrypt(succefullResponse, secretKey),
      };
    } catch (error) {
      console.log('error saving the card ', error);
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

  async findAllUserCards(userId: string): Promise<addCardResponse> {
    //get all the cards
    console.log('userid ', userId);
    const cardsByUserId = await this.cardRepository.findBy({ userId });
    console.log('all the cards found! ', cardsByUserId);
    return {
      service: 'addCard',
      error: encrypt(cardsByUserId, secretKey),
    };
    // return {
    //   service: 'addCard',
    //   error: `Error decripting information`,
    // };
  }
  async updateCardPreference(id: string, cypheredCard: string) {
    console.log('start change preference!');
    try {
      const updateToFind = await this.cardRepository.findOneBy({ id });
      if (updateToFind !== null) {
        const changePreference = await this.cardRepository.findOneBy({
          preference: '1',
        });
        //update the status of the last card to 0, it means it is not prefered
        changePreference.preference = '0';
        await this.cardRepository.save(changePreference);
        //update the status of the update card to 1, it means it is prefered
        updateToFind.preference = '1';
        await this.cardRepository.save(updateToFind);
        return {
          service: 'updateCard',
          cypheredResponse: encrypt('Card updated successfully', secretKey),
        };
      } else {
        return {
          service: 'updateCard',
          error: encrypt('Card not found!', secretKey),
        };
      }
    } catch (error) {
      console.log('Update error ', error);
      return {
        service: 'updateCard',
        error: `Error decripting information: ${error}`,
      };
    }

    return `This action updates a #${id} card`;
  }

  create(createCardDto: CreateCardDto) {
    console.log(createCardDto);
    return 'This action adds a new card';
  }
  findAll() {
    return `This action returns all cards`;
  }

  findOne(id: number) {
    return `This action returns a #${id} card`;
  }

  async remove(id: string): Promise<addCardResponse> {
    try {
      const removeToFind = await this.cardRepository.findOneBy({ id });
      if (removeToFind !== null) {
        await this.cardRepository.remove(removeToFind);
        return {
          service: 'removeCard',
          cypheredResponse: encrypt('Card deleted successfully', secretKey),
        };
      } else {
        return {
          service: 'removeCard',
          error: encrypt('Object not found!', secretKey),
        };
      }
    } catch (error) {
      console.log('Delete error ', error);
      return {
        service: 'removeCard',
        error: `Error decripting information: ${error}`,
      };
    }
  }
}
