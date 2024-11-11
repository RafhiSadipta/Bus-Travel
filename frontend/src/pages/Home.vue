<template enter-class="h-screen w-screen">
  <div
    class="h-screen w-auto relative flex flex-row items-center justify-start bg-[url('./assets/dashboard-bg.jpg')] bg-cover bg-no-repeat bg-[top] text-left text-[1.5rem] text-white font-montserrat">
    <div class="absolute inset-0 bg-dark-green-50"></div>
    <div class="self-stretch flex-1 flex flex-row items-center justify-center">
      <div
        class="[backdrop-filter:blur(50px)] rounded-2xl bg-dark-green-50 flex flex-col items-center justify-center py-10 px-8 gap-8">
        <div class="self-stretch flex flex-col items-start justify-start gap-[0.5rem]">
          <b class="self-stretch relative">Pesan tiket bismu disini</b>
          <div class="self-stretch relative text-[0.875rem]">Temukan semua rute perjalanan yang kamu <br>butuhkan disini
          </div>
        </div>
        <div class="w-[23.75rem] flex flex-col items-center justify-center gap-[2rem] text-[1rem] text-dark-green-50">
          <div class="self-stretch flex flex-col items-start justify-start gap-[1rem]">
            <!-- Input Keberangkatan -->
            <div
              class="self-stretch rounded-81xl bg-white flex flex-row items-center justify-start py-[0.875rem] px-[1.875rem]">
              <input type="text" v-model="keberangkatan" placeholder="Dari mana?" required
                class="w-full bg-transparent border-none outline-none font-semibold text-base" />
            </div>

            <!-- Swap Icon for Tukar Destinasi -->
            <div class="self-stretch flex items-center justify-center text-white">
              <img src="../assets/swap_vert.svg" alt="Swap" class="w-6 h-6 cursor-pointer" @click="swapDestinations" />
            </div>

            <!-- Input Tujuan -->
            <div
              class="self-stretch rounded-81xl bg-white flex flex-row items-center justify-start py-[0.875rem] px-[1.875rem]">
              <input type="text" v-model="tujuan" placeholder="Mau kemana?" required
                class="w-full bg-transparent border-none outline-none font-semibold text-base" />
            </div>

            <!-- Input Tanggal -->
            <div
              class="self-stretch rounded-81xl bg-white flex flex-row items-center justify-start py-[0.875rem] px-[1.875rem]">
              <input type="datetime-local" v-model="tanggal" required
                class="w-full bg-transparent border-none outline-none font-semibold text-base" />
            </div>
          </div>

          <!-- Button Cari Tiket -->
          <btn @click="cariTiket"
            class="self-stretch rounded-81xl bg-green flex flex-row items-center justify-center py-[0.875rem] px-[1.875rem] text-center text-white">
            <b class="flex-1 relative">CARI TIKET</b>
          </btn>
        </div>
      </div>
    </div>
    <div class="self-stretch flex-1"></div>
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
        // Show alert and redirect to login if not logged in
        alert("Silakan login terlebih dahulu untuk mencari tiket.");
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
    },
    swapDestinations() {
      // Swap values of keberangkatan and tujuan
      const temp = this.keberangkatan;
      this.keberangkatan = this.tujuan;
      this.tujuan = temp;
    }
  },
};
</script>

<style scoped>
.btn,
.self-stretch {
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

.btn:hover {
  background-color: #0c9871;
  color: #e7f5f1;
  transform: scale(1.03);
}
</style>
