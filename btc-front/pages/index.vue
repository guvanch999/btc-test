<template>
  <div>

    <div class="container">
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <Dropdown @change="lastDayChanged" v-model="selectedLastDate" :options="days" placeholder="Last n days"
                  class="w-full md:w-14rem"/>

        <Calendar v-model="fromDate" @date-select="dateChanged" placeholder="From date"/>
        <Calendar v-model="toDate" @date-select="dateChanged" placeholder="To date"/>
      </div>
      <DataTable :value="btcStore.prices" tableStyle="min-width: 50rem">
        <Column field="id" header="ID"></Column>
        <Column field="date_time" header="Date"></Column>
        <Column field="price.USD.rate_float" header="USD"></Column>
        <Column field="price.GBP.rate_float" header="GBP"></Column>
        <Column field="price.EUR.rate_float" header="EUR"></Column>
      </DataTable>
      <Paginator
          :rows="10"
          :rowsPerPageOptions="[10, 20, 30]"
          :totalRecords="btcStore.total"
          @page="pageUpdated"
      >
      </Paginator>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBtcStore } from "#imports";
import type { ListQueriesInterface } from "~/common/interfaces/list-queries.interface";

const btcStore = useBtcStore();
onMounted(async () => {
  await btcStore.fetchData({
    page: 1, limit: 10,
  });
});
const currentLimit = ref(10);
const pageUpdated = async (event: {
  page: number, rows: number
}) => {
  currentLimit.value = event.rows;
  await btcStore.fetchData({
    page: event.page + 1, limit: event.rows,
  });
};

const selectedLastDate = ref();
const days = ref([1, 2, 5, 7, 10, 20, 30]);

const lastDayChanged = async ({ value }: any) => {
  const date = new Date();
  fromDate.value = undefined;
  toDate.value = undefined;
  date.setDate(date.getDate() - value);
  await btcStore.fetchData({
    page: 1, limit: currentLimit.value, startDate: date.toISOString(),
  });
};

const fromDate = ref();
const toDate = ref();

const dateChanged = async (event: any) => {
  selectedLastDate.value = undefined;
  const params: ListQueriesInterface = {
    page: 1, limit: currentLimit.value,
  };
  if (fromDate.value) {
    params.startDate = fromDate.value.toISOString();
  }
  if (toDate.value) {
    params.endDate = toDate.value.toISOString();
  }
  await btcStore.fetchData(params);
};
</script>

<style lang="css">
@import url("primevue/resources/themes/lara-light-green/theme.css");

.container {
  margin: auto;
  max-width: 920px
}
</style>