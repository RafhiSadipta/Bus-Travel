<template>
    <div>
      <h2>Manajemen Transaksi</h2>
      <table v-if="transaksiList.length > 0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama Client</th>
            <th>ID Tiket</th>
            <th>Kode Kursi</th>
            <th>Metode Transaksi</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaksi in transaksiList" :key="transaksi.id">
            <td>{{ transaksi.id }}</td>
            <td>{{ transaksi.nama_user }}</td>
            <td>{{ transaksi.tiket_id }}</td>
            <td>{{ transaksi.kode_kursi }}</td>
            <td>{{ transaksi.metode_transaksi }}</td>
            <td>{{ transaksi.status }}</td>
            <td>
              <button v-if="transaksi.status === 'pending'" @click="approveTransaksi(transaksi.id)">ACC</button>
              <button v-if="transaksi.status === 'pending'" @click="rejectTransaksi(transaksi.id)">Reject</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>Tidak ada transaksi untuk ditampilkan.</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        transaksiList: [],
      };
    },
    async created() {
      await this.loadTransaksi();
    },
    methods: {
      async loadTransaksi() {
        try {
          const response = await axios.get('http://localhost:5000/api/transaksi');
          this.transaksiList = response.data;
        } catch (error) {
          console.error("Failed to load transaksi:", error);
        }
      },
      async approveTransaksi(id) {
        try {
          await axios.put(`http://localhost:5000/api/transaksi/${id}`, { status: 'acc' });
          await this.loadTransaksi(); // Refresh setelah update
        } catch (error) {
          console.error("Failed to approve transaksi:", error);
        }
      },
      async rejectTransaksi(id) {
        try {
          await axios.put(`http://localhost:5000/api/transaksi/${id}`, { status: 'rejected' });
          await this.loadTransaksi(); // Refresh setelah update
        } catch (error) {
          console.error("Failed to reject transaksi:", error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Tambahkan gaya sesuai kebutuhan */
  </style>
  