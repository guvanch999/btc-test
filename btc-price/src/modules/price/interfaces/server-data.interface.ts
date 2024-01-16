export interface ServerDataInterface {
  time: {
    updatedISO: string;
  };
  bpi: {
    USD: PriceInterface;
    GBP: PriceInterface;
    EUR: PriceInterface;
  };
}

export interface PriceInterface {
  code: string;
  symbol: string;
  rate: string;
  description: string;
  rate_float: number;
}
