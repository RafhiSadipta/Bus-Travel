<template enter-class="w-screen h-screen">
    <div class="home">
      <h1>Selamat Datang di Travel Bus</h1>
      <form @submit.prevent="cariTiket">
        <div class="form-group">
          <label>Dari</label>
          <input type="text" v-model="keberangkatan" placeholder="Lokasi Keberangkatan" required />
        </div>
        <div class="form-group">
          <label>Ke</label>
          <input type="text" v-model="tujuan" placeholder="Lokasi Tujuan" required />
        </div>
        <div class="form-group">
          <label>Tanggal Berangkat (Opsional)</label>
          <input type="date" v-model="tanggal" />
        </div>
        <button type="submit">Cari Tiket</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        keberangkatan: '',
        tujuan: '',
        tanggal: '',
      };
    },
    methods: {
      cariTiket() {
        if (!this.isLoggedIn()) {
          // Arahkan ke login dan hentikan proses pencarian
          this.$router.push('/login');
          return;
        }
        
        // Jika sudah login, lanjutkan ke halaman result dengan parameter pencarian
        this.$router.push({
          name: 'result',
          query: {
            keberangkatan: this.keberangkatan,
            tujuan: this.tujuan,
            tanggal: this.tanggal || null,
          },
        });
      },
      isLoggedIn() {
        return !!localStorage.getItem('token');
      },
    },
  };
  </script>
  