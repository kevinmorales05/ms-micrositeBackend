import { Entity, PrimaryColumn, Column, Generated } from 'typeorm';
@Entity()
export class ItemPurchased {
  @PrimaryColumn({ type: 'uuid' }) // Generate uuid
  @Generated('uuid')
  id: string;
  @Column()
  purchaseId: string;
  @Column()
  productSKU: string;
  @Column()
  name: string;
  @Column()
  productDescription: string;
  @Column()
  unitaryCost: number;
  @Column()
  taxesPercentage: number;
  @Column()
  quantity: number;
  @Column()
  subtotal: number;
  @Column()
  total: number;
}




  
 