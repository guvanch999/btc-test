import { Injectable } from '@nestjs/common';
import { ServerDataInterface } from '../price/interfaces/server-data.interface';
import { PriceService } from '../price/price.service';

@Injectable()
export class TimerService {
  constructor(private readonly priceService: PriceService) {}

  public async start() {
    //start code here
    this.startTimer();
    console.log('Timer is started');
  }

  public async startTimer() {
    setTimeout(async () => {
      try {
        console.log(new Date().toISOString());
        await this.fetchData();
      } catch (err) {
        throw err;
      } finally {
        this.startTimer();
      }
    }, 3600000);
  }

  public async fetchData() {
    return new Promise((resolve, reject) => {
      fetch('https://api.coindesk.com/v1/bpi/currentprice.json', {
        method: 'get',
      })
        .then((res) => {
          return res.json();
        })
        .then(async (data: ServerDataInterface) => {
          await this.writeToDb(data);
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public async writeToDb(data: ServerDataInterface) {
    const date = new Date(data.time.updatedISO);
    const lastDate = await this.priceService.getLastData();
    if (!lastDate || date.toISOString() > lastDate.toISOString()) {
      await this.priceService.insertData(data, date);
    }
  }
}
