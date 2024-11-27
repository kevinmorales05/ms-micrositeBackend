import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CreateCardCypheredDto } from './dto/create-card-cyphered.dto';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post('/cypher')
  createCypher(@Body() createCardCypheredDto: CreateCardCypheredDto) {
    return this.cardsService.createCypher(createCardCypheredDto);
  }

  @Get(':userId')
  findAll(@Param('userId') userId: string) {
    console.log('Get all cards! ', userId);
    return this.cardsService.findAllUserCards(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCardDto: string) {
    return this.cardsService.updateCardPreference(id, updateCardDto);
  }

  @Delete(':cardId')
  remove(@Param('cardId') cardId: string) {
    console.log('start delete');
    return this.cardsService.remove(cardId);
  }
  @Post()
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }
}
