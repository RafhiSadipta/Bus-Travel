<template enter-class="w-screen h-screen">
    <div class="relative flex flex-col items-center justify-start py-8 px-16 box-border gap-8 text-left text-12xl">
      <h3>Transaction Management</h3>
  
      <!-- Tabel Transaksi -->
      <table v-if="transaksiList.length > 0" class="self-stretch border-collapse rounded-2xl overflow-hidden shadow-md border-dark-green w-full">
        <thead>
          <tr>
            <th class="p-4">ID</th>
            <th class="p-4">Nama Client</th>
            <th class="p-4">ID Tiket</th>
            <th class="p-4">Kode Kursi</th>
            <th class="p-4">Metode Transaksi</th>
            <th class="p-4">Status</th>
            <th class="p-4">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(transaksi, index) in transaksiList" :key="transaksi.id" :class="index % 2 === 0 ? 'bg-green-20' : 'bg-white'">
            <td class="p-4">{{ transaksi.id }}</td>
            <td class="p-4">{{ transaksi.nama_user }}</td>
            <td class="p-4">{{ transaksi.tiket_id }}</td>
            <td class="p-4">{{ transaksi.kode_kursi }}</td>
            <td class="p-4">{{ transaksi.metode_transaksi }}</td>
            <td class="p-4">{{ transaksi.status }}</td>
            <td class="p-4 flex gap-2">
              <button v-if="transaksi.status === 'pending'" @click="confirmAction('approve', transaksi.id)" class="bg-green text-white font-semibold px-4 rounded-full">
                ACC
              </button>
              <button v-if="transaksi.status === 'pending'" @click="confirmAction('reject', transaksi.id)" class="bg-pastel-red text-white font-semibold px-4 rounded-full">
                Reject
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else class="text-gray-600">Tidak ada transaksi untuk ditampilkan.</p>
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
        console.log("Transaksi List:", this.transaksiList); // Log data to verify
    } catch (error) {
        console.error("Failed to load transaksi:", error);
    }
}
,
      async confirmAction(action, id) {
        const actionText = action === 'approve' ? 'approve' : 'reject';
        if (window.confirm(`Are you sure you want to ${actionText} this transaction?`)) {
          if (action === 'approve') {
            await this.approveTransaksi(id);
          } else {
            await this.rejectTransaksi(id);
          }
        }
      },
      async approveTransaksi(id) {
        try {
          await axios.put(`http://localhost:5000/api/transaksi/${id}`, { status: 'acc' });
          alert("Transaction approved successfully.");
          await this.loadTransaksi(); // Refresh setelah update
        } catch (error) {
          console.error("Failed to approve transaksi:", error);
        }
      },
      async rejectTransaksi(id) {
        try {
          await axios.put(`http://localhost:5000/api/transaksi/${id}`, { status: 'rejected' });
          alert("Transaction rejected successfully.");
          await this.loadTransaksi(); // Refresh setelah update
        } catch (error) {
          console.error("Failed to reject transaksi:", error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Styling for alternating row colors and table */
  .table {
    border-collapse: collapse;
    width: 100%;
  }
  .table th,
  .table td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  .table tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  .table th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #04aa6d;
    color: white;
  }
  </style>
  