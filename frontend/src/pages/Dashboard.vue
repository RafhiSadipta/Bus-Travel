Frame 10
<template>
  <div
    class="admin-home relative flex flex-row items-center justify-center py-8 px-16 box-border gap-8 text-left text-12xl text-dark-green bg-grey font-montserrat">
    <div
      class="self-stretch flex-1 overflow-hidden flex flex-col items-start justify-start gap-8">
      <router-link to="/kelola-user" class="self-stretch no-underline text-dark-green">
        <div
        class="self-stretch shadow-[0px_2px_5px_rgba(0,_0,_0,_0.15)] rounded-2xl bg-white h-[120px] overflow-hidden shrink-0 flex flex-row items-center justify-start py-2.5 px-[30px] box-border gap-4 cursor-pointer">
        <img class="w-16 relative h-16" alt="" src="..\assets\account_circle.svg" />
        <b class="relative">User Management</b>
      </div>
      </router-link>
      <router-link to="kelola-agen" class="self-stretch no-underline text-dark-green">
        <div
        class="self-stretch shadow-[0px_2px_5px_rgba(0,_0,_0,_0.15)] rounded-2xl bg-white h-[120px] overflow-hidden shrink-0 flex flex-row items-center justify-start py-2.5 px-[30px] box-border gap-4 cursor-pointer">
        <img class="w-16 relative h-16" alt="" src="..\assets\id_card.svg" />
        <b class="relative">Agent Management</b>
      </div>
      </router-link>
      <router-link to="/kelola-terminal" class="self-stretch no-underline text-dark-green">
        <div
        class="self-stretch shadow-[0px_2px_5px_rgba(0,_0,_0,_0.15)] rounded-2xl bg-white h-[120px] overflow-hidden shrink-0 flex flex-row items-center justify-start py-2.5 px-[30px] box-border gap-4 cursor-pointer">
        <img class="w-16 relative h-16" alt="" src="..\assets\file_map.svg" />
        <b class="relative">Terminal Management</b>
      </div>
      </router-link>
      <router-link to="/kelola-bus" class="self-stretch no-underline text-dark-green">
        <div
        class="self-stretch shadow-[0px_2px_5px_rgba(0,_0,_0,_0.15)] rounded-2xl bg-white h-[120px] overflow-hidden shrink-0 flex flex-row items-center justify-start py-2.5 px-[30px] box-border gap-4 cursor-pointer">
        <img class="w-16 relative h-16" alt="" src="..\assets\directions_bus.svg" />
        <b class="relative">Bus Management</b>
      </div>
      </router-link>
      <router-link to="/kelola-fasilitas" class="self-stretch no-underline text-dark-green">
        <div
        class="self-stretch shadow-[0px_2px_5px_rgba(0,_0,_0,_0.15)] rounded-2xl bg-white h-[120px] overflow-hidden shrink-0 flex flex-row items-center justify-start py-2.5 px-[30px] box-border gap-4 cursor-pointer">
        <img class="w-16 relative h-16" alt="" src="..\assets\airplay.svg" />
        <b class="relative">Facility Management</b>
      </div>
      </router-link>
    </div>
    <div
      class="self-stretch flex-1 overflow-hidden flex flex-col items-start justify-start gap-8">
      <router-link to="/kelola-rute" class="self-stretch no-underline text-dark-green">
        <div
        class="self-stretch shadow-[0px_2px_5px_rgba(0,_0,_0,_0.15)] rounded-2xl bg-white h-[120px] overflow-hidden shrink-0 flex flex-row items-center justify-start py-2.5 px-[30px] box-border gap-4 cursor-pointer">
        <img class="w-16 relative h-16" alt="" src="..\assets\fork_left.svg" />
        <b class="relative">Route Management</b>
      </div>
      </router-link>
      <router-link to="/kelola-kursi" class="self-stretch no-underline text-dark-green">
        <div
        class="self-stretch shadow-[0px_2px_5px_rgba(0,_0,_0,_0.15)] rounded-2xl bg-white h-[120px] overflow-hidden shrink-0 flex flex-row items-center justify-start py-2.5 px-[30px] box-border gap-4 cursor-pointer">
        <img class="w-16 relative h-16" alt="" src="..\assets\flight_class.svg" />
        <b class="relative">Seat Management</b>
      </div>
      </router-link>
      <router-link to="/kelola-transaksi" class="self-stretch no-underline text-dark-green">
        <div
        class="self-stretch shadow-[0px_2px_5px_rgba(0,_0,_0,_0.15)] rounded-2xl bg-white h-[120px] overflow-hidden shrink-0 flex flex-row items-center justify-start py-2.5 px-[30px] box-border gap-4 cursor-pointer">
        <img class="w-16 relative h-16" alt="" src="..\assets\local_atm.svg" />
        <b class="relative">Transaction Management</b>
      </div>
      </router-link>
      <router-link to="/kelola-tiket" class="self-stretch no-underline text-dark-green">
        <div
        class="self-stretch shadow-[0px_2px_5px_rgba(0,_0,_0,_0.15)] rounded-2xl bg-white h-[120px] overflow-hidden shrink-0 flex flex-row items-center justify-start py-2.5 px-[30px] box-border gap-4 cursor-pointer">
        <img class="w-16 relative h-16" alt="" src="..\assets\confirmation_number.svg" />
        <b class="relative">Ticket Management</b>
      </div>
      </router-link>
      
    </div>
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
    },
    isAdmin() {
      const token = localStorage.getItem('token');
      if (token) {
        const role = JSON.parse(atob(token.split('.')[1])).role;
        return role === 'admin';
      }
      return false;
    }
  }
};
</script>

<style scoped>
.admin-home {
  height: calc(100vh - 92px);
}
</style>