import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BtcEntity } from './entities/btc.entity';
import {
  Between,
  FindOperator,
  LessThan,
  MoreThan,
  Not,
  Repository,
} from 'typeorm';
import { ServerDataInterface } from './interfaces/server-data.interface';
import { ListQueriesInterface } from '../../common/interfaces/list-queries.interface';

@Injectable()
export class PriceService {
  constructor(
    @InjectRepository(BtcEntity)
    private readonly btcRepository: Repository<BtcEntity>,
  ) {}

  public async getLastData() {
    const last = await this.btcRepository.findOne({
      where: {
        date_time: Not(new Date()),
      },
      order: {
        date_time: 'DESC',
      },
    });
    return last.date_time;
  }

  public async insertData(data: ServerDataInterface, time: Date) {
    return this.btcRepository.save({
      price: JSON.stringify(data.bpi),
      date_time: time,
    });
  }

  public async getData(payload: ListQueriesInterface) {
    const where: { date_time?: FindOperator<Date> } = {};
    if (payload.startDate && payload.endDate) {
      where.date_time = Between(
        new Date(payload.startDate),
        new Date(payload.endDate),
      );
    } else if (payload.startDate) {
      where.date_time = MoreThan(new Date(payload.startDate));
    } else if (payload.endDate) {
      where.date_time = LessThan(new Date(payload.endDate));
    }
    console.log(where);
    const [data, count] = await this.btcRepository.findAndCount({
      where,
      take: payload.limit,
      skip: (payload.page - 1) * payload.limit,
    });
    return {
      count,
      data: data.map((entity) => {
        return {
          id: entity.id,
          price: JSON.parse(entity.price),
          date_time: entity.date_time,
        };
      }),
    };
  }
}
