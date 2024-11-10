<template enter-class="w-screen h-screen">
  <div
    class="self-stretch relative flex flex-col items-center justify-start py-8 px-16 box-border gap-8 text-left text-12xl">
    <h3>Seat Management</h3>

    <div class="flex flex-row gap-2 w-1/2">
      <select v-model="selectedTiket" id="tiketSelect" @change="loadKursi" required
        class="w-2/3 bg-white rounded-81xl border-none outline-none font-semibold text-sm py-3 px-[1.875rem]">
        <option value="" disabled selected></option>
        <option v-for="tiket in tiketList" :key="tiket.id" :value="tiket.id">
          Tiket ID {{ tiket.id }} - Agen: {{ tiket.nama_agen }} - Rute: {{ tiket.terminal_awal_nama }} ke {{
            tiket.terminal_akhir_nama }}
        </option>
      </select>
    <button @click="generateKursi" :disabled="!selectedTiket"
      class="w-1/3 rounded-81xl flex items-center justify-center py-3 px-8 bg-green text-white font-semibold text-sm">
      Generate Kursi
    </button>
  </div>
  <p v-if="message" class="mt-2 text-red-500">{{ message }}</p>

  <!-- Daftar Kursi -->
  <table v-if="kursiList.length > 0" class="w-1/2 border-collapse rounded-2xl overflow-hidden shadow-md border-dark-green text-center">
    <thead>
      <tr>
        <th class="p-4">Kode Kursi</th>
        <th class="p-4">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(kursi, index) in kursiList" :key="kursi.id" 
      :class="index % 2 === 0 ? 'bg-green-20' : 'bg-white-30'">
        <td class="p-2">{{ kursi.kode_kursi }}</td>
        <td class="p-2">{{ kursi.status ? "Tersedia" : "Terpesan" }}</td>
      </tr>
    </tbody>
  </table>
  <p v-else class="text-dark-green-50">Tidak ada kursi tersedia untuk tiket ini.</p>
</div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      tiketList: [],
      kursiList: [],
      selectedTiket: null,
      message: '',
    };
  },
  async created() {
    await this.loadTikets();
  },
  methods: {
    async loadTikets() {
      try {
        const response = await axios.get('http://localhost:5000/api/tikets');
        this.tiketList = response.data;
      } catch (error) {
        console.error("Failed to load tikets:", error);
        this.message = "Gagal memuat tiket.";
      }
    },
    async loadKursi() {
      if (!this.selectedTiket) return;

      try {
        const response = await axios.get(`http://localhost:5000/api/kursi/${this.selectedTiket}`);
        this.kursiList = response.data;
      } catch (error) {
        console.error("Failed to load kursi:", error);
        this.message = "Gagal memuat kursi untuk tiket ini.";
      }
    },
    async generateKursi() {
      try {
        await axios.post('http://localhost:5000/api/kursi/generate', {
          id_tiket: this.selectedTiket
        });
        this.message = "Kursi berhasil dibuat untuk tiket yang dipilih.";
        await this.loadKursi(); // Refresh kursi setelah generate
      } catch (error) {
        console.error("Error generating kursi:", error);
        this.message = "Gagal membuat kursi. Silakan coba lagi.";
      }
    },
  },
};
</script>

<style scoped>
/* Tambahkan gaya sesuai kebutuhan */
</style>