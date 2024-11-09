<template>
  <div>
    <header>
      <h1>My Application</h1>
      <nav>
        <router-link to="/dashboard">Dashboard</router-link>
        <router-link v-if="isAdmin" to="/kelola-user">Kelola User</router-link>
        <router-link v-if="isAdmin" to="/kelola-agen">Kelola Agen</router-link>
        <router-link v-if="isAdmin" to="/kelola-terminal">Kelola Terminal</router-link>
        <router-link v-if="isAdmin" to="/kelola-rute">Rute</router-link>
        <router-link v-if="isAdmin" to="/kelola-fasilitas">Fasilitas</router-link>
        <router-link v-if="isAdmin" to="/kelola-bus">Bus</router-link>
        <router-link v-if="isAdmin" to="/kelola-tiket">Tiket</router-link>
        <button @click="logout">Logout</button>
      </nav>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  computed: {
    isAdmin() {
      const token = localStorage.getItem('token');
      if (token) {
        const role = JSON.parse(atob(token.split('.')[1])).role;
        return role === 'admin';
      }
      return false;
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/'); // Kembali ke halaman login
    }
  }
};
</script>

<style scoped>
header {
  background-color: #f4f4f4;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav {
  display: flex;
  gap: 10px;
}

nav a {
  text-decoration: none;
  color: #333;
}

nav button {
  cursor: pointer;
  padding: 5px 10px;
}
</style>