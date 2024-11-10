<template>
    <div>
      <h2>Manajemen Kursi</h2>
  
      <label for="tiketSelect">Pilih Tiket:</label>
      <select v-model="selectedTiket" id="tiketSelect" @change="loadKursi">
        <option v-for="tiket in tiketList" :key="tiket.id" :value="tiket.id">
          Tiket ID {{ tiket.id }} - Agen: {{ tiket.nama_agen }} - Rute: {{ tiket.terminal_awal_nama }} ke {{ tiket.terminal_akhir_nama }}
        </option>
      </select>
  
      <button @click="generateKursi" :disabled="!selectedTiket">Generate Kursi</button>
      <p v-if="message">{{ message }}</p>
  
      <h3>Daftar Kursi</h3>
      <table v-if="kursiList.length > 0">
        <thead>
          <tr>
            <th>Kode Kursi</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="kursi in kursiList" :key="kursi.id">
            <td>{{ kursi.kode_kursi }}</td>
            <td>{{ kursi.status ? "Tersedia" : "Terpesan" }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else>Tidak ada kursi tersedia untuk tiket ini.</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        tiketList: [],
        kursiList: [],
        selectedTiket: null,
        message: '',
      };
    },
    async created() {
      await this.loadTikets();
    },
    methods: {
      async loadTikets() {
        try {
          const response = await axios.get('http://localhost:5000/api/tikets');
          this.tiketList = response.data;
        } catch (error) {
          console.error("Failed to load tikets:", error);
          this.message = "Gagal memuat tiket.";
        }
      },
      async loadKursi() {
        if (!this.selectedTiket) return;
        
        try {
          const response = await axios.get(`http://localhost:5000/api/kursi/${this.selectedTiket}`);
          this.kursiList = response.data;
        } catch (error) {
          console.error("Failed to load kursi:", error);
          this.message = "Gagal memuat kursi untuk tiket ini.";
        }
      },
      async generateKursi() {
        try {
          await axios.post('http://localhost:5000/api/kursi/generate', {
            id_tiket: this.selectedTiket
          });
          this.message = "Kursi berhasil dibuat untuk tiket yang dipilih.";
          await this.loadKursi(); // Refresh kursi setelah generate
        } catch (error) {
          console.error("Error generating kursi:", error);
          this.message = "Gagal membuat kursi. Silakan coba lagi.";
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Tambahkan gaya sesuai kebutuhan */
  </style>
  