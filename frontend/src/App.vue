<template>
  <div id="app">
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem('token');
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  nav {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 20px;
  }
  nav a, nav button {
    font-weight: bold;
    text-decoration: none;
    color: #42b983;
  }
  nav button {
    border: none;
    background: none;
    cursor: pointer;
  }
</style>
