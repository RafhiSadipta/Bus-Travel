<template>
  <div
    class="w-full relative bg-dark-green h-[92px] overflow-hidden shrink-0 flex flex-row items-center justify-between py-2.5 px-8 box-border text-left text-base text-green font-montserrat">
    <div class="w-[262px] relative h-12">
      <router-link to="/dashboard">
        <img src="..\assets\logo.png" alt="logo" class="cursor-pointer" />
      </router-link> 
    </div>
    <div class="flex flex-row items-center justify-start gap-2 text-white">
      <btn @click="profile"
        class="rounded-31xl bg-green flex flex-row items-center justify-center py-3.5 px-[30px] cursor-pointer">
        <b class="relative">PROFILE</b>
      </btn>
      <btn @click="logout"
        class="rounded-31xl flex flex-row items-center justify-center py-3.5 px-[30px] text-green cursor-pointer">
        <b class="relative">LOGOUT</b>
      </btn>
    </div>
  </div>
  <main>
    <router-view></router-view>
  </main>
</template>


<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/'); // Kembali ke halaman login
    }
  }
};
</script>