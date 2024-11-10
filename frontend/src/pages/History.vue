<template>
    <div class="history">
      <h2>Transaction History</h2>
      <div v-if="transactions.length > 0">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tiket ID</th>
              <th>Kursi</th>
              <th>Metode Pembayaran</th>
              <th>Status</th>
              <th>Tanggal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transaction in transactions" :key="transaction.id">
              <td>{{ transaction.id }}</td>
              <td>{{ transaction.tiket_id }}</td>
              <td>{{ transaction.kode_kursi }}</td>
              <td>{{ transaction.metode_transaksi }}</td>
              <td>{{ transaction.status }}</td>
              <td>{{ formatDate(transaction.created_at) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else>No transaction history found.</p>
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
          this.transactions = response.data;
        } catch (error) {
          console.error("Error fetching transactions:", error);
        }
      },
      formatDate(date) {
        return new Date(date).toLocaleDateString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      }
    },
  };
  </script>
  