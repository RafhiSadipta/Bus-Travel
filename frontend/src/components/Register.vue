<template enter-class="h-screen w-screen">
  <div
    class="h-screen w-screen relative flex flex-col items-center justify-center bg-[url('./assets/login-bg.jpg')] bg-cover bg-no-repeat bg-[top] text-left text-lg">
    <div class="absolute inset-0 bg-dark-green-50"></div>
    <div
      class="card h-auto [backdrop-filter:blur(50px)] rounded-2xl bg-grey-60 flex flex-col items-center justify-center py-10 px-8 gap-8">
      <div class="flex flex-col items-start justify-start text-center text-dark-green">
        <b class="relative">Register</b>
      </div>
      <div class="w-[23.75rem] flex flex-col items-center justify-center gap-8 text-base">
        <div class="flex flex-col items-start justify-start gap-4">
          <div
            class="w-[23.75rem] rounded-81xl bg-white h-12 flex flex-row items-center justify-start py-3.5 px-[1.875rem] box-border">
            <input type="text" placeholder="Username" v-model="username"
              class="w-full bg-transparent border-none outline-none font-semibold text-base" required />
          </div>
          <div
            class="w-[23.75rem] rounded-81xl bg-white h-12 flex flex-row items-center justify-start py-3.5 px-[1.875rem] box-border">
            <input type="email" placeholder="Email" v-model="email"
              class="w-full bg-transparent border-none outline-none font-semibold text-base" required />
          </div>
          <div class="self-stretch rounded-81xl bg-white flex flex-row items-center justify-start py-3.5 px-[1.875rem]">
            <input type="password" placeholder="Password" v-model="password"
              class="w-full bg-transparent border-none outline-none font-semibold text-base" required />
          </div>
          <div
            class="w-[23.75rem] rounded-81xl bg-white h-12 flex flex-row items-center justify-start py-3.5 px-[1.875rem] box-border">
            <select v-model="role" class="w-full bg-transparent border-none outline-none font-semibold text-base"
              required>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
        <btn @click="register"
          class="button self-stretch rounded-81xl bg-green flex flex-row items-center justify-center py-3.5 px-[1.875rem] text-center text-white">
          <b class="flex-1 relative">Register</b>
        </btn>
      </div>
      <router-link to="/">
        <div
          class="link relative text-sm font-semibold cursor-pointer text-dark-green-50 no-underline">
          Already have an account? Click here to login</div>
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
.button, .card, .link {
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

.button:hover {
  background-color: #0c9871;
  color: #e7f5f1;
  transform: scale(1.03);
}

.card:hover {
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.15);
  transform: scale(1.03);
}

.link:hover {
  color: rgb(16 207 147);
}
</style>