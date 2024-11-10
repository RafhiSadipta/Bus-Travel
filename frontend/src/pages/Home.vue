<template enter-class="w-screen h-screen">
    <div class="home">
      <h1>Selamat Datang di Travel Bus</h1>
      
      <!-- Search Form -->
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
      
      <!-- Login Button -->
      <button @click="goToLogin" class="login-button">Login</button>
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
          // Redirect to login and stop the search process
          this.$router.push('/login');
          return;
        }
        
        // If logged in, proceed to the result page with search parameters
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
      goToLogin() {
        this.$router.push('/login');
      }
    },
  };
  </script>
  
  <style scoped>
  .login-button {
    background-color: #4CAF50; /* Green background */
    color: white;              /* White text */
    padding: 10px 20px;        /* Some padding */
    margin-top: 20px;          /* Spacing above button */
    border: none;              /* Remove border */
    cursor: pointer;           /* Pointer cursor on hover */
    font-size: 16px;           /* Button text size */
    border-radius: 5px;        /* Rounded corners */
  }
  
  .login-button:hover {
    background-color: #45a049; /* Darker green on hover */
  }
  </style>
  