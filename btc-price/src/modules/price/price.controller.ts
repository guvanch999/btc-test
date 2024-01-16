import { Controller, Get } from '@nestjs/common';
import { PriceService } from './price.service';
import { ListQueries } from '../../common/decarators/list-queries.decerator';
import { ListQueriesInterface } from '../../common/interfaces/list-queries.interface';
import { ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('price')
@ApiTags('Prices')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @Get()
  @ApiQuery({
    name: 'endDate',
    required: false,
  })
  @ApiQuery({
    name: 'startDate',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    required: true,
  })
  @ApiQuery({
    name: 'page',
    required: true,
  })
  async getBalances(@ListQueries() queries: ListQueriesInterface) {
    console.log(queries);
    return this.priceService.getData(queries);
  }
}
