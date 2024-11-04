<template>
    <div>
      <h1>Register</h1>
      <form @submit.prevent="register">
        <input v-model="username" placeholder="Username" required />
        <input v-model="email" placeholder="Email" type="email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <select v-model="role" required>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="agen">Agen</option>
        </select>
        <button type="submit">Register</button>
      </form>
      <p>
        Sudah punya akun? 
        <router-link to="/">Login di sini</router-link>
      </p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
        role: 'user' // Set default role
      };
    },
    methods: {
      async register() {
        try {
          await axios.post('http://localhost:5000/auth/register', {
            username: this.username,
            email: this.email,
            password: this.password,
            role: this.role // Sertakan role dalam permintaan
          });
          alert("Registration successful! You can now log in.");
          this.$router.push('/'); // Redirect to login page after registration
        } catch (error) {
          console.error(error);
          alert("Registration failed. Please try again.");
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Tambahkan styling sesuai kebutuhan */
  </style>
  