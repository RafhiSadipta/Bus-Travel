<template enter-class="h-screen w-screen">
  <div
    class="relative bg-grey overflow-hidden flex flex-col items-center justify-start pt-[2rem] px-[2rem] pb-[0rem] box-border gap-[3rem] text-left text-[0.875rem] text-dark-green-50 font-montserrat">

    <div class="flex flex-row items-center justify-center gap-[1rem]">
      <div class="flex flex-row items-center justify-start gap-[0.5rem]">
        <div
          class="w-[20rem] shadow-[0px_2px_5px_rgba(0,_0,_0,_0.15)] rounded-81xl bg-white flex flex-row items-center justify-start py-[0.75rem] px-[1.5rem] box-border">
          <input type="text" v-model="keberangkatan" placeholder="Dari mana?"
            class="w-full bg-transparent border-none outline-none font-semibold text-base" />
        </div>
        <img src="..\assets\swap_horiz.svg" alt="Swap" class="w-[1rem] h-[1rem] cursor-pointer"
          @click="swapDestinations" />
        <div
          class="w-[20rem] shadow-[0px_2px_5px_rgba(0,_0,_0,_0.15)] rounded-81xl bg-white flex flex-row items-center justify-start py-[0.75rem] px-[1.5rem] box-border">
          <input type="text" v-model="tujuan" placeholder="Mau kemana?"
            class="w-full bg-transparent border-none outline-none font-semibold text-base" />
        </div>
      </div>
      <div
        class="shadow-[0px_2px_5px_rgba(0,_0,_0,_0.15)] rounded-81xl bg-white flex flex-row items-center justify-start py-[0.75rem] px-[1.5rem] box-border">
        <input type="date" v-model="tanggal" placeholder="12/11/2024"
          class="w-full bg-transparent border-none outline-none font-semibold text-base" />
      </div>
      <btn @click="cariTiket"
        class="shadow-[0px_2px_5px_rgba(0,_0,_0,_0.15)] rounded-81xl bg-green flex flex-row items-center justify-center py-[0.75rem] px-[1.5rem] text-center text-white">
        <b class="relative">CARI TIKET</b>
      </btn>
    </div>

    <!-- Hasil Pencarian -->
    <div class="w-full flex-1 flex flex-row items-center justify-center gap-[2rem] text-dark-green">
      <div class="w-full flex flex-col items-center justify-center gap-[1rem]">
        <div class="w-10/12 flex flex-row items-start justify-center px-8 gap-8">
          <b class="sort-item relative cursor-pointer text-center w-1/6" :class="{ active: sortKey === 'agen' }"
            @click="sortBy('agen')">
            Agen <span v-if="sortKey === 'agen'">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
          </b>
          <b class="sort-item relative cursor-pointer text-center w-1/6"
            :class="{ active: sortKey === 'keberangkatan' }" @click="sortBy('keberangkatan')">
            Keberangkatan <span v-if="sortKey === 'keberangkatan'">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
          </b>
          <b class="sort-item relative cursor-pointer text-center w-1/6" :class="{ active: sortKey === 'kedatangan' }"
            @click="sortBy('kedatangan')">
            Kedatangan <span v-if="sortKey === 'kedatangan'">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
          </b>
          <b class="sort-item relative cursor-pointer text-center w-1/6" :class="{ active: sortKey === 'durasi' }"
            @click="sortBy('durasi')">
            Durasi <span v-if="sortKey === 'durasi'">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
          </b>
          <b class="sort-item relative cursor-pointer text-center w-1/6" :class="{ active: sortKey === 'harga' }"
            @click="sortBy('harga')">
            Harga Tiket <span v-if="sortKey === 'harga'">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
          </b>
          <b class="sort-item relative cursor-pointer text-center w-1/6"
            :class="{ active: sortKey === 'kursi_tersedia' }" @click="sortBy('kursi_tersedia')">
            Kapasitas <span v-if="sortKey === 'kursi_tersedia'">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
          </b>
          <b class="sort-item relative cursor-pointer text-center w-1/6"></b>
        </div>

        <!-- Daftar Tiket -->
        <div class="w-full flex-1 overflow-hidden flex flex-col items-center justify-center gap-4 text-lg">
          <div v-for="tiket in sortedTikets" :key="tiket.id"
            class="card w-10/12 shadow-[0px_2px_5px_rgba(0,_0,_0,_0.15)] rounded-2xl bg-white overflow-hidden flex flex-row items-center justify-between py-4 px-8 box-border">
            <img class="w-[10rem] h-[6.25rem] object-cover" alt="Logo Agen" :src="`http://localhost:5000${tiket.logo}`" />
            <div class="flex flex-col items-start">
              <b class="relative text-sm">{{ formatTanggal(tiket.waktu_berangkat) }}</b>
              <span class="relative text-sm">{{ formatWaktu(tiket.waktu_berangkat) }}</span>
            </div>
            <div class="flex flex-col items-start">
              <b class="relative text-sm">{{ formatTanggal(tiket.estimasi_sampai) }}</b>
              <span class="relative text-sm">{{ formatWaktu(tiket.estimasi_sampai) }}</span>
            </div>
            <div class="flex flex-col items-start">
              <span class="relative text-sm text-dark-green">{{ calculateDuration(tiket.waktu_berangkat,
                tiket.estimasi_sampai) }}</span>
            </div>
            <b class="relative text-green">Rp. {{ formatHarga(tiket.harga) }}</b>
            <div class="relative text-[1rem] font-semibold text-dark-green-50">{{ tiket.kursi_tersedia }} kursi
            </div>
            <btn @click="pesanTiket(tiket.id)" class="bg-green text-white font-bold text-sm px-4 py-2 rounded-31xl">
              Pesan Tiket
            </btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      keberangkatan: this.$route.query.keberangkatan || '',
      tujuan: this.$route.query.tujuan || '',
      tanggal: this.$route.query.tanggal || '',
      tiketList: [],
      sortKey: '', // Key yang digunakan untuk sort
      sortOrder: 'asc' // Order sort: 'asc' atau 'desc'
    };
  },
  computed: {
    sortedTikets() {
      if (!this.sortKey) return this.tiketList;

      return [...this.tiketList].sort((a, b) => {
        let aValue = a[this.sortKey];
        let bValue = b[this.sortKey];

        if (this.sortKey === 'keberangkatan') {
          aValue = new Date(a.waktu_berangkat);
          bValue = new Date(b.waktu_berangkat);
        } else if (this.sortKey === 'kedatangan') {
          aValue = new Date(a.estimasi_sampai);
          bValue = new Date(b.estimasi_sampai);
        } else if (this.sortKey === 'durasi') {
          const startA = new Date(a.waktu_berangkat);
          const endA = new Date(a.estimasi_sampai);
          const startB = new Date(b.waktu_berangkat);
          const endB = new Date(b.estimasi_sampai);
          aValue = endA - startA;
          bValue = endB - startB;
        }

        let result = 0;
        if (aValue < bValue) result = -1;
        if (aValue > bValue) result = 1;
        return this.sortOrder === 'asc' ? result : -result;
      });
    }
  },
  created() {
    if (this.keberangkatan || this.tujuan || this.tanggal) {
      this.fetchTikets();
    } else {
      this.fetchAllTikets();
    }
  },
  watch: {
    '$route.query': 'fetchTikets'
  },
  methods: {
    async fetchAllTikets() {
      try {
        const response = await axios.get('http://localhost:5000/api/tikets');
        this.tiketList = response.data;
      } catch (error) {
        console.error("Error fetching all tikets:", error);
      }
    },
    async fetchTikets() {
      try {
        const response = await axios.get('http://localhost:5000/api/tikets/search', {
          params: {
            keberangkatan: this.keberangkatan.toUpperCase(),
            tujuan: this.tujuan.toUpperCase(),
            tanggal: this.tanggal || null
          }
        });
        this.tiketList = response.data;
      } catch (error) {
        console.error("Error fetching tiket:", error);
      }
    },
    cariTiket() {
      if (this.keberangkatan && this.tujuan) {
        this.$router.push({
          name: 'result',
          query: {
            keberangkatan: this.keberangkatan.toUpperCase(),
            tujuan: this.tujuan.toUpperCase(),
            tanggal: this.tanggal || null
          }
        });
      } else {
        alert("Keberangkatan dan tujuan tidak boleh kosong!");
      }
    },
    swapDestinations() {
      const temp = this.keberangkatan;
      this.keberangkatan = this.tujuan;
      this.tujuan = temp;
    },
    formatTanggal(date) {
      return new Date(date).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
    formatWaktu(date) {
      return new Date(date).toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    calculateDuration(start, end) {
      const startTime = new Date(start);
      const endTime = new Date(end);
      const diffMs = endTime - startTime;
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      return `${hours} jam ${minutes} menit`;
    },
    formatHarga(harga) {
      return harga.toLocaleString('id-ID');
    },
    pesanTiket(tiketId) {
      this.$router.push({ name: 'transaksi', params: { id: tiketId } });
    },
    sortBy(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortKey = key;
        this.sortOrder = 'asc';
      }
    }
  }
};
</script>

<style scoped>
.sort-item {
  transition: color 0.3s ease, font-weight 0.3s ease;
}

.sort-item:hover {
  color: rgb(16 207 147);
}

.sort-item.active {
  color: rgb(16 207 147);
  font-weight: bold;
}
</style>
