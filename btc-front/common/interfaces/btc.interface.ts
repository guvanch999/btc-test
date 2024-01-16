export interface ResponseInterface {
  count: number,
  data: PriceEntity[]
}

export interface PriceEntity {
  id: number;
  date_time: string;
  price: {
    USD: Price; GBP: Price; EUR: Price
  };
}

export interface Price {
  code: string;
  symbol: string;
  rate: string;
  description: string;
  rate_float: number;
}