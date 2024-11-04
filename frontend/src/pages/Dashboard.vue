<template>
    <div>
      <h2>Dashboard</h2>
      <p>Halo, selamat datang {{ username }}</p>
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      username() {
        // Ambil username dari token atau local storage
        const token = localStorage.getItem('token');
        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          return payload.username || "User"; // Ganti sesuai dengan struktur token
        }
        return "User";
      }
    }
  };
  </script>
  
  <style scoped>
  h2 {
    color: #333;
  }
  </style>
  