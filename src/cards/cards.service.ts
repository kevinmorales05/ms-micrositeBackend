import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CreateCardCypheredDto } from './dto/create-card-cyphered.dto';
import { Card } from './entities/card.entity';
import { decrypt } from 'src/utils/cypher';


@Injectable()
export class CardsService {
  create(createCardDto: CreateCardDto) {
    return 'This action adds a new card';
  }

  createCypher(createCardDto: CreateCardCypheredDto) {
    console.log('received cyphered service: ', createCardDto.service);
    console.log('received cyphered token: ', createCardDto.cypheredPayload);

    const data = decrypt(createCardDto.cypheredPayload, 'key-decrypt');
    //valide structure of json received

    //determine  the type of the card

    //validate if the data is correct in visa

    //tokenize the card number

    //create the card
    const newCard = new Card();

    //add the information to the card

    //save the card

    //return a succesful message

    //return error message if it is an error

    return 'This action adds a new card cyphered!';
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
