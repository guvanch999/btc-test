import { Module } from '@nestjs/common';
import { PriceController } from './price.controller';
import { PriceService } from './price.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BtcEntity } from './entities/btc.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BtcEntity])],
  controllers: [PriceController],
  providers: [PriceService],
  exports: [PriceService],
})
export class PriceModule {}
