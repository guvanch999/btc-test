import type { PriceEntity, ResponseInterface } from "~/common/interfaces/btc.interface";
import type { ListQueriesInterface } from "~/common/interfaces/list-queries.interface";

export const useBtcStore = defineStore("btc", () => {
  const prices = ref<PriceEntity[]>([]);
  const total = ref<number>(0);

  const fetchData = async (queries: ListQueriesInterface) => {
    return new Promise((resolve, reject) => {
      $fetch("http://localhost:3033/price", {
        method: "get", query: queries,
      }).then((res: any) => {
        console.log(res)
        return res;
      }).then((data: ResponseInterface) => {
        prices.value = data.data;
        total.value = data.count;
        resolve(true);
      }).catch(err => {
        reject(err);
      });
    });
  };
  return { fetchData, prices, total };
});