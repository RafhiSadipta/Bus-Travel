<template>
  <div class="history w-full flex flex-col items-center justify-start gap-8 pt-[2rem] px-[2rem] text-left text-[0.875rem] text-dark-green-50 font-montserrat">
    <div v-if="transactions.length > 0" class="w-10/12 flex flex-col gap-4">
      <div class="w-full flex flex-row items-center justify-center gap-4 px-8">
        <b class="text-center w-1/6">Agen</b>
        <b class="text-center w-1/6">Rute</b>
        <b class="text-center w-1/6">Keberangkatan</b>
        <b class="text-center w-1/6">Kedatangan</b>
        <b class="text-center w-1/6">Kursi</b>
      </div>
      <div
        v-for="transaction in transactions" :key="transaction.id"
        class="card w-full shadow-[0px_2px_5px_rgba(0,_0,_0,_0.15)] rounded-2xl bg-white flex flex-row items-center justify-between py-4 px-8 box-border gap-4"
      >
        <div class="text-center w-1/6">{{ transaction.agen }}</div>
        <div class="text-center w-1/6">{{ transaction.rute }}</div>
        <div class="text-center w-1/6">{{ formatDate(transaction.keberangkatan) }}</div>
        <div class="text-center w-1/6">{{ formatDate(transaction.kedatangan) }}</div>
        <div class="text-center w-1/6">{{ transaction.kode_kursi }}</div>
      </div>
    </div>
    <p v-else class="text-lg font-semibold text-dark-green-50">No transaction history found.</p>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      transactions: [],
    };
  },
  async created() {
    await this.fetchUserTransactions();
  },
  methods: {
    async fetchUserTransactions() {
      try {
        const userId = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).id;
        const response = await axios.get(`http://localhost:5000/api/transaksi/user/${userId}`);
        const transactions = response.data;

        // Retrieve additional details for each transaction's ticket
        const transactionDetails = await Promise.all(
          transactions.map(async (transaction) => {
            const ticketDetails = await this.fetchTiketDetails(transaction.id_tiket);
            return {
              ...transaction,
              agen: ticketDetails.nama_agen || 'N/A',
              rute: `${ticketDetails.terminal_awal_nama || 'N/A'} (${ticketDetails.terminal_awal_kota || 'N/A'}) - ${ticketDetails.terminal_akhir_nama || 'N/A'} (${ticketDetails.terminal_akhir_kota || 'N/A'})`,
              keberangkatan: ticketDetails.waktu_berangkat,
              kedatangan: ticketDetails.estimasi_sampai,
            };
          })
        );

        this.transactions = transactionDetails;
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    },
    async fetchTiketDetails(tiketId) {
      try {
        // Fetch ticket details based on tiketId
        const response = await axios.get(`http://localhost:5000/api/tikets/${tiketId}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching ticket details:", error);
        return {};
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    },
  },
};
</script>


<style scoped>
.card {
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: scale(1.02);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}
</style>