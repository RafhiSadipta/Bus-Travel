<template>
    <div class="result">
      <h2>Hasil Pencarian Tiket</h2>
      <form @submit.prevent="cariTiket">
        <div class="form-group">
          <label>Dari</label>
          <input type="text" v-model="keberangkatan" placeholder="Lokasi Keberangkatan" />
        </div>
        <div class="form-group">
          <label>Ke</label>
          <input type="text" v-model="tujuan" placeholder="Lokasi Tujuan" />
        </div>
        <div class="form-group">
          <label>Tanggal Berangkat (Opsional)</label>
          <input type="date" v-model="tanggal" />
        </div>
        <button type="submit">Cari Tiket</button>
      </form>
  
      <div v-if="tiketList.length > 0">
        <h3>Daftar Tiket</h3>
        <ul>
          <li v-for="tiket in tiketList" :key="tiket.id">
            <p>
              <strong>Keberangkatan:</strong> 
              {{ tiket.terminal_awal_nama }} ({{ tiket.terminal_awal_kota }}) - 
              <strong>Tujuan:</strong> 
              {{ tiket.terminal_akhir_nama }} ({{ tiket.terminal_akhir_kota }})<br />
              <strong>Tanggal:</strong> {{ formatDate(tiket.waktu_berangkat) }}<br />
              <strong>Harga:</strong> Rp {{ formatHarga(tiket.harga) }}
            </p>
          </li>
        </ul>
      </div>
      <p v-else>Tidak ada tiket yang ditemukan.</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        keberangkatan: this.$route.query.keberangkatan || '',
        tujuan: this.$route.query.tujuan || '',
        tanggal: this.$route.query.tanggal || '',
        tiketList: [],
      };
    },
    created() {
      // Check if there are query parameters to perform a search or load all tickets if no search parameters exist
      if (this.keberangkatan || this.tujuan || this.tanggal) {
        this.fetchTikets(); // Fetch tickets based on search criteria
      } else {
        this.fetchAllTikets(); // Load all tickets if no search criteria provided
      }
    },
    methods: {
      // Function to fetch all tickets
      async fetchAllTikets() {
        try {
          const response = await axios.get('http://localhost:5000/api/tikets');
          this.tiketList = response.data;
        } catch (error) {
          console.error("Error fetching all tikets:", error);
        }
      },
      // Function to fetch tickets based on search criteria
      async fetchTikets() {
        try {
          const response = await axios.get('http://localhost:5000/api/tikets/search', {
            params: {
              keberangkatan: this.keberangkatan.toUpperCase(),
              tujuan: this.tujuan.toUpperCase(),
              tanggal: this.tanggal || null,
            },
          });
          this.tiketList = response.data;
        } catch (error) {
          console.error("Error fetching tiket:", error);
        }
      },
      // Function to handle search submission
      cariTiket() {
        if (this.keberangkatan && this.tujuan) {
          this.$router.push({
            name: 'result',
            query: {
              keberangkatan: this.keberangkatan.toUpperCase(),
              tujuan: this.tujuan.toUpperCase(),
              tanggal: this.tanggal || null,
            },
          }).then(() => {
            this.fetchTikets(); // Call fetchTikets after route update
          });
        } else {
          alert("Keberangkatan dan tujuan tidak boleh kosong!");
        }
      },
      formatDate(date) {
        return new Date(date).toLocaleDateString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      },
      formatHarga(harga) {
        return harga.toLocaleString('id-ID');
      },
    },
  };
  </script>
  
  
  <style scoped>
  /* Tambahkan CSS styling sesuai kebutuhan */
  </style>
  