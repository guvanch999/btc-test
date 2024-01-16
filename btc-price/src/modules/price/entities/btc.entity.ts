import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('btc_prices')
export class BtcEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: 'json' }) price: string;

  @Column({ type: 'timestamp' }) date_time: Date;
}
