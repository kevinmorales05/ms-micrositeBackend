import { Injectable } from '@nestjs/common';
import { CreateDynamicUrlDto } from './dto/create-dynamic-url.dto';
import { UpdateDynamicUrlDto } from './dto/update-dynamic-url.dto';
import { ItemPurchased } from './entities/itemPurchase.entity';
import { DynamicUrl } from './entities/dynamic-url.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { encrypt } from 'src/utils/cypher';
let secretKey = 'mySecretKey12345';

@Injectable()
export class DynamicUrlService {
  constructor(
    @InjectRepository(DynamicUrl)
    private readonly dynamicUrl: Repository<DynamicUrl>,
  ) {}
  //method to create a new purchase url
  async create(createDynamicUrlDto: CreateDynamicUrlDto) {
    const newPurchase = new DynamicUrl();
    console.log('info received', createDynamicUrlDto);
    //add information to the new purchase entity
    newPurchase.merchantCode = createDynamicUrlDto.merchantCode;
    newPurchase.merchantName = createDynamicUrlDto.merchantName;
    newPurchase.purchaseItemsId = createDynamicUrlDto.purchaseId;
    newPurchase.purchaseToken = 'in_process';
    newPurchase.subtotal = createDynamicUrlDto.subtotal;
    newPurchase.total = createDynamicUrlDto.total;

    const createdPurchase = await this.dynamicUrl.save(newPurchase);
    //create purchase url
    const { id } = createdPurchase; //get the purchaseID
    //get the purchase id
    console.log('new id created ', id);
    console.log('created purchase ', createdPurchase);
    //save the products created
    createDynamicUrlDto.purchaseItems.map((item) => {
      const newItem = new ItemPurchased();
      newItem.name = item.name;
      newItem.productDescription = item.productDescription;
      newItem.productSKU = item.productSKU;
      newItem.purchaseId = id;
      newItem.quantity = item.quantity;
      newItem.subtotal = item.subtotal;
      newItem.taxesPercentage = item.taxesPercentage;
      newItem.total = item.total;
      newItem.unitaryCost = item.unitaryCost;
      console.log(newItem);
    });
    //cypher the information as a token
    const infoPurchase = {
      id: id,
      merchantId: createDynamicUrlDto.merchantCode,
      merchantName: createDynamicUrlDto.merchantName,
      products: createDynamicUrlDto.purchaseItems,
      subtotal: createDynamicUrlDto.subtotal,
      taxes: createDynamicUrlDto.taxesPercentage,
      total: createDynamicUrlDto.total,
      username: createDynamicUrlDto.username,
    };
    const purchaseToken = encrypt(infoPurchase, secretKey);
    console.log('purchase token ', purchaseToken);
    //save the token in the purchase information table
    const updateToken = await this.dynamicUrl.findOneBy({ id });
    updateToken.purchaseToken = purchaseToken;
    await this.dynamicUrl.save(updateToken);
    //return the url

    return {
      redirect: `http://localhost:3001/detail/${id}`,
      message: 'Purchase generated successfully',
    };
  }

  findAll() {
    return `This action returns all dynamicUrl`;
  }

  async findOne(id: string) {
    const tokenToFind = await this.dynamicUrl.findOneBy({ id });
    if (tokenToFind !== null) {
      console.log('Purchase token ', tokenToFind.purchaseToken);
      console.log('Purchase ', tokenToFind);
      return {
        message: 'Token obtained successfully',
        token: tokenToFind.purchaseToken,
      };
    }
    return {
      message: 'Token not found!',
      token: null,
    };
  }

  update(id: number, updateDynamicUrlDto: UpdateDynamicUrlDto) {
    return `This action updates a #${id} dynamicUrl`;
  }

  remove(id: number) {
    return `This action removes a #${id} dynamicUrl`;
  }
}
