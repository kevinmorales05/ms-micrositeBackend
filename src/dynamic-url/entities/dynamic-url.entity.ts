import { IsNumber } from 'class-validator';
import { Entity, PrimaryColumn, Column, Generated } from 'typeorm';
@Entity()
export class DynamicUrl {
  @PrimaryColumn({ type: 'uuid' }) // Generate uuid
  @Generated('uuid')
  id: string;
  @Column()
  merchantCode: string;
  @Column()
  merchantName: string;
  @Column({ type: 'decimal', precision: 10, scale: 2 }) // Store as decimal
  @IsNumber()
  subtotal: number;
  @Column({ type: 'decimal', precision: 10, scale: 2 }) // Store as decimal
  @IsNumber()
  total: number;
  //@Column({ unique: true })
  @Column()
  purchaseToken: string;
  @Column()
  purchaseItemsId: string;
}
