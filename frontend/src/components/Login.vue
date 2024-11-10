<template enter-class="h-screen w-screen">
  <div
    class="h-screen w-screen relative flex flex-col items-center justify-center bg-[url('./assets/login-bg.jpg')] bg-cover bg-no-repeat bg-[top] text-left text-lg text-dark-green-50 font-montserrat">
    <div class="absolute inset-0 bg-dark-green-50"></div>
    <div
      class="h-auto [backdrop-filter:blur(50px)] rounded-2xl bg-grey-60 flex flex-col items-center justify-center py-10 px-8 gap-8">
      <div class="flex flex-col items-start justify-start text-center text-dark-green">
        <b class="relative">Login</b>
      </div>
      <div class="w-[23.75rem] flex flex-col items-center justify-center gap-8 text-base">
        <div class="flex flex-col items-start justify-start gap-4">
          <div
            class="w-[23.75rem] rounded-81xl bg-white h-12 flex flex-row items-center justify-start py-3.5 px-[1.875rem] box-border">
            <input type="email" placeholder="Email" v-model="email"
              class="w-full bg-transparent border-none outline-none font-semibold text-base" />
          </div>
          <div class="self-stretch rounded-81xl bg-white flex flex-row items-center justify-start py-3.5 px-[1.875rem]">
            <input type="password" placeholder="Password" v-model="password"
              class="w-full bg-transparent border-none outline-none font-semibold text-base" />
          </div>
        </div>
        <btn @click="login"
          class="self-stretch rounded-81xl bg-green flex flex-row items-center justify-center py-3.5 px-[1.875rem] text-center text-white cursor-pointer">
          <b class="flex-1 relative">START TRAVELING</b>
        </btn>
      </div>
      <router-link to="/register">
        <div
          class="relative text-sm font-semibold cursor-pointer text-dark-green-50 underline decoration-dark-green-50">
          Don’t have an account yet? Create one now</div>
      </router-link>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
  async login() {
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        email: this.email,
        password: this.password,
      });
      
      const token = response.data.token;
      localStorage.setItem('token', token);

      // Redirect berdasarkan role setelah login berhasil
      const userRole = JSON.parse(atob(token.split('.')[1])).role;
      if (userRole === 'admin') {
        this.$router.push({ path: '/dashboard' });
      } else {
        this.$router.push({ path: '/result' });
      }
    } catch (error) {
      this.errorMessage = 'Login gagal. Periksa kredensial Anda.';
      console.error("Error during login:", error);
    }
  },
},
};
</script>

<style scoped>

</style>