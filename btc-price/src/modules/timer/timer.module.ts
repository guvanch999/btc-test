import { Module } from '@nestjs/common';
import { TimerService } from './TimerService';
import { PriceModule } from '../price/price.module';

@Module({
  imports: [PriceModule],
  providers: [TimerService],
  exports: [TimerService],
})
export class TimerModule {}
