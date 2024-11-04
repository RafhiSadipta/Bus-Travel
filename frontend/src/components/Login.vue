<template>
    <div>
      <h1>Login</h1>
      <form @submit.prevent="login">
        <input v-model="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p>
        Belum punya akun? 
        <router-link to="/register">Daftar di sini</router-link>
      </p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return { email: '', password: '' };
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('http://localhost:5000/auth/login', {
            email: this.email,
            password: this.password,
          });
          localStorage.setItem('token', response.data.token);
          this.$router.push('/dashboard');
        } catch (error) {
          console.error(error);
          alert("Login failed. Please check your credentials.");
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Tambahkan styling sesuai kebutuhan */
  </style>
  