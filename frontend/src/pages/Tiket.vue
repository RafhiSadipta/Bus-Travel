<template enter-class="w-screen h-screen">
  <div
    class="self-stretch relative flex flex-col items-center justify-start py-8 px-16 box-border gap-8 text-left text-12xl">
    <h3>Ticket Management</h3>
    <form @submit.prevent="createOrUpdateTiket" class="flex flex-col items-center gap-2 w-4/5">
      <div class="flex flex-row gap-2 w-full">
        <div class="flex flex-col gap-2 w-full">
          <div class="w-full rounded-81xl bg-white flex items-center justify-start py-3 px-[1.875rem] box-border">
            <select v-model="newTiket.id_agen" required
              class="w-full bg-transparent border-none outline-none font-semibold text-sm">
              <option value="" disabled selected>Pilih Agen</option>
              <option v-for="agen in agenList" :key="agen.id" :value="agen.id">
                {{ agen.nama }}
              </option>
            </select>
          </div>
        </div>

        <!-- Bus Selection -->
        <div class="flex flex-col gap-2 w-full">
          <div class="w-full rounded-81xl bg-white flex items-center justify-start py-3 px-[1.875rem] box-border">
            <select v-model="newTiket.id_bus" required
              class="w-full bg-transparent border-none outline-none font-semibold text-sm">
              <option value="" disabled selected>Pilih Bus</option>
              <option v-for="bus in busList" :key="bus.id" :value="bus.id">
                {{ bus.jenis }} (Kapasitas: {{ bus.kapasitas }})
              </option>
            </select>
          </div>
        </div>

        <!-- Rute Selection -->
        <div class="flex flex-col gap-2 w-full">
          <div class="w-full rounded-81xl bg-white flex items-center justify-start py-3 px-[1.875rem] box-border">
            <select v-model="newTiket.id_rute" required
              class="w-full bg-transparent border-none outline-none font-semibold text-sm">
              <option value="" disabled selected>Pilih Rute</option>
              <option v-for="rute in ruteList" :key="rute.id" :value="rute.id">
                {{ rute.terminal_awal_nama }} ({{ rute.terminal_awal_kota }}) - {{
                  rute.terminal_akhir_nama
                }}
                ({{ rute.terminal_akhir_kota }})
              </option>
            </select>
          </div>
        </div>
      </div>

      <div class="flex flex-wor gap-2 w-full">
        <div class="flex flex-col gap-2 w-full">
          <label class="font-semibold text-sm">Waktu Berangkat:</label>
          <div class="w-full rounded-81xl bg-white flex items-center justify-start py-3 px-[1.875rem] box-border">
            <input type="datetime-local" v-model="newTiket.waktu_berangkat" required
              class="w-full bg-transparent border-none outline-none font-semibold text-sm" />
          </div>
        </div>

        <!-- Estimasi Sampai -->
        <div class="flex flex-col gap-2 w-full">
          <label class="font-semibold text-sm">Estimasi Sampai:</label>
          <div class="w-full rounded-81xl bg-white flex items-center justify-start py-3 px-[1.875rem] box-border">
            <input type="datetime-local" v-model="newTiket.estimasi_sampai" required
              class="w-full bg-transparent border-none outline-none font-semibold text-sm" />
          </div>
        </div>

        <!-- Harga -->
        <div class="flex flex-col gap-2 w-full">
          <label class="font-semibold text-sm">Harga:</label>
          <div class="w-full rounded-81xl bg-white flex items-center justify-start py-3 px-[1.875rem] box-border">
            <input type="number" v-model="newTiket.harga" placeholder="Harga (tanpa desimal)" required
              class="w-full bg-transparent border-none outline-none font-semibold text-sm" />
          </div>
        </div>
      </div>

      <div class="flex flex-row gap-2 w-1/2">
        <button type="submit"
          class="w-full rounded-81xl flex items-center justify-center py-3 px-8 bg-green text-white font-semibold text-sm">
          {{ isEditing ? "Perbarui Tiket" : "Tambah Tiket" }}
        </button>
        <btn v-if="isEditing" type="button" @click="cancelEdit"
          class="w-full button rounded-81xl bg-pastel-red flex items-center justify-center py-3 px-8 text-white text-sm">
          <b class="flex-1 text-center">Cancel</b>
        </btn>
      </div>
    </form>


    <p v-if="message" :class="{ success: isSuccess, error: !isSuccess }">{{ message }}</p>

    <table v-if="tiketList.length > 0"
      class="self-stretch border-collapse rounded-2xl overflow-hidden shadow-md border-dark-green">
      <thead>
        <tr class="bg-dark-green">
          <th class="p-4">Agen</th>
          <th class="p-4">Bus</th>
          <th class="p-4">Rute</th>
          <th class="p-4">Waktu Berangkat</th>
          <th class="p-4">Estimasi Sampai</th>
          <th class="p-4">Harga</th>
          <th class="p-4">Kursi Tersedia</th>
          <th class="p-4">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(tiket, index) in tiketList" :key="tiket.id"
          :class="index % 2 === 0 ? 'bg-green-20' : 'bg-white-30'">
          <td class="p-4">{{ tiket.nama_agen }}</td>
          <td class="p-4">{{ tiket.jenis_bus }}</td>
          <td class="p-4">
            {{ tiket.terminal_awal_nama }} ({{ tiket.terminal_awal_kota }}) -
            {{ tiket.terminal_akhir_nama }} ({{ tiket.terminal_akhir_kota }})
          </td>
          <td class="p-4">{{ formatDate(tiket.waktu_berangkat) }}</td>
          <td class="p-4">{{ formatDate(tiket.estimasi_sampai) }}</td>
          <td class="p-4">{{ formatHarga(tiket.harga) }}</td>
          <td class="p-4">{{ tiket.kursi_tersedia }}</td>
          <td class="p-4 flex flex-col">
            <btn @click="editTiket(tiket)" class="bg-pastel-yellow text-white font-bold text-sm px-4 py-2 rounded-31xl">
              Edit
            </btn>
            <btn @click="deleteTiket(tiket.id)"
              class="bg-pastel-red text-white font-bold text-sm px-4 py-2 rounded-31xl">
              Hapus
            </btn>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>Tidak ada data tiket tersedia.</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tiketList: [],
      agenList: [],
      busList: [],
      ruteList: [],
      newTiket: {
        id_agen: '',
        id_bus: '',
        id_rute: '',
        waktu_berangkat: '',
        estimasi_sampai: '',
        harga: '',
      },
      isEditing: false,
      editingTiketId: null,
      message: '',
      isSuccess: true,
    };
  },
  async created() {
    await this.loadTikets();
    await this.loadAgen();
    await this.loadBus();
    await this.loadRute();
  },
  methods: {
    async loadTikets() {
      try {
        const response = await axios.get('http://localhost:5000/api/tikets');
        this.tiketList = response.data;
      } catch (error) {
        console.error('Failed to load tikets:', error);
        this.message = 'Gagal memuat data tiket. Silakan coba lagi.';
        this.isSuccess = false;
      }
    }
    ,
    async loadAgen() {
      try {
        const response = await axios.get('http://localhost:5000/agen');
        this.agenList = response.data;
      } catch (error) {
        console.error('Failed to load agen:', error);
        this.message = 'Gagal memuat data agen.';
        this.isSuccess = false;
      }
    },
    async loadBus() {
      try {
        const response = await axios.get('http://localhost:5000/api/buses');
        this.busList = response.data;
      } catch (error) {
        console.error('Failed to load buses:', error);
        this.message = 'Gagal memuat data bus.';
        this.isSuccess = false;
      }
    },
    async loadRute() {
      try {
        const response = await axios.get('http://localhost:5000/api/rutes');
        this.ruteList = response.data;
        console.log("Rute List:", this.ruteList); // Log data rute yang diterima
      } catch (error) {
        console.error('Failed to load rutes:', error);
        this.message = 'Gagal memuat data rute.';
        this.isSuccess = false;
      }
    }
    ,
    async createTiket() {
      try {
        const response = await axios.post('http://localhost:5000/api/tikets', this.newTiket);
        this.tiketList.push(response.data.tiket);
        this.message = 'Tiket berhasil ditambahkan!';
        this.isSuccess = true;
        this.resetForm();
      } catch (error) {
        console.error('Error adding tiket:', error);
        this.message = 'Gagal menambahkan tiket. Silakan coba lagi.';
        this.isSuccess = false;
      }
    },
    async updateTiket() {
      try {
        await axios.put(`http://localhost:5000/api/tikets/${this.editingTiketId}`, this.newTiket);
        this.message = 'Tiket berhasil diperbarui!';
        this.isSuccess = true;
        await this.loadTikets(); // Refresh data tiket setelah update
        this.resetForm();
      } catch (error) {
        console.error('Error updating tiket:', error);
        this.message = 'Gagal memperbarui tiket. Silakan coba lagi.';
        this.isSuccess = false;
      }
    },
    async createOrUpdateTiket() {
      if (this.isEditing) {
        await this.updateTiket();
      } else {
        await this.createTiket();
      }
    },
    resetForm() {
      this.newTiket = {
        id_agen: '',
        id_bus: '',
        id_rute: '',
        waktu_berangkat: '',
        estimasi_sampai: '',
        harga: '',
      };
      this.isEditing = false;
      this.editingTiketId = null;
    },
    async deleteTiket(id) {
      try {
        await axios.delete(`http://localhost:5000/api/tikets/${id}`);
        this.tiketList = this.tiketList.filter(tiket => tiket.id !== id);
        this.message = 'Tiket berhasil dihapus!';
        this.isSuccess = true;
      } catch (error) {
        console.error('Error deleting tiket:', error);
        this.message = 'Gagal menghapus tiket. Silakan coba lagi.';
        this.isSuccess = false;
      }
    },
    editTiket(tiket) {
      this.newTiket = {
        id_agen: tiket.id_agen,
        id_bus: tiket.id_bus,
        id_rute: tiket.id_rute,
        waktu_berangkat: tiket.waktu_berangkat,
        estimasi_sampai: tiket.estimasi_sampai,
        harga: tiket.harga,
      };
      this.isEditing = true;
      this.editingTiketId = tiket.id;
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(date).toLocaleDateString('id-ID', options);
    },
    formatHarga(harga) {
      // Pastikan harga didefinisikan sebelum melakukan toString()
      if (harga == null) return "Rp. 0"; // Tampilkan default "Rp. 0" jika harga undefined atau null
      return "Rp. " + harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    cancelEdit() {
      this.resetForm(); // Mengatur ulang form dan keluar dari mode edit
    },
  },
};
</script>
