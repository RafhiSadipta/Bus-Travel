<template enter-class="h-screen w-screen">
  <div
    class="transaksi w-full flex flex-col items-center justify-start gap-8 pt-[2rem] px-[2rem] text-left text-[0.875rem] text-dark-green-50 font-montserrat">
    
    <div v-if="tiket" class="w-11/12 shadow-[0px_2px_5px_rgba(0,_0,_0,_0.15)] rounded-2xl bg-white overflow-hidden flex flex-col items-center justify-start py-[1rem] px-[2rem] box-border gap-[2rem]">
      <div class="w-full flex flex-row items-center justify-between">
        <div class="w-[9.913rem] relative font-medium flex items-center justify-center shrink-0">Agen</div>
        <div class="w-[11.5rem] relative font-medium flex items-center justify-center shrink-0">Rute</div>
        <div class="w-[6.5rem] relative font-medium flex items-center justify-center shrink-0">Keberangkatan</div>
        <div class="w-[6.5rem] relative font-medium flex items-center justify-center shrink-0">Kedatangan</div>
        <div class="w-[9.313rem] relative font-medium flex items-center justify-center shrink-0">Harga</div>
        <div class="w-[6.938rem] relative font-medium flex items-center justify-center shrink-0">Nomor Kursi</div>
      </div>

      <div class="w-full flex flex-row items-center justify-between text-[1rem] text-dark-green">
        <img class="w-[10rem] h-[6.25rem] object-cover" alt="Logo Agen" :src="`http://localhost:5000${tiket.logo}`" />
        <div class="relative font-semibold text-sm">
          <p class="m-0">{{ tiket.terminal_awal_nama || 'N/A' }} ({{ tiket.terminal_awal_kota || 'N/A' }}) - <br>
            {{ tiket.terminal_akhir_nama || 'N/A' }} ({{ tiket.terminal_akhir_kota || 'N/A' }})</p>
        </div>
        <div class="flex flex-col items-start">
          <b class="relative text-sm text-center">{{ formatTanggal(tiket.waktu_berangkat) }}</b>
          <span class="relative text-sm text-center">{{ formatWaktu(tiket.waktu_berangkat) }}</span>
        </div>
        <div class="flex flex-col items-start">
          <b class="relative text-sm text-center">{{ formatTanggal(tiket.estimasi_sampai) }}</b>
          <span class="relative text-sm text-center">{{ formatWaktu(tiket.estimasi_sampai) }}</span>
        </div>
        <b class="relative text-[1.5rem] text-green text-left">Rp. {{ formatHarga(tiket.harga) }}</b>
        <div class="w-[6.938rem] relative">
          <select v-model="selectedSeat" class="w-full py-2 px-4 border rounded-2xl">
            <option v-for="kursi in availableSeats" :key="kursi.id" :value="kursi.id">
              {{ kursi.kode_kursi }}
            </option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- Booking Buttons -->
    <div class="w-1/2 flex flex-row items-center justify-center gap-2">
      <button @click="showPaymentPopup" class="w-1/2 bg-green text-white py-3.5 px-[1.875rem] rounded-31xl font-bold text-center">Pesan Sekarang</button>
      <button @click="cancelBooking" class="w-1/2 bg-pastel-red text-white py-3.5 px-[1.875rem] rounded-31xl font-bold text-center">Batal</button>
    </div>

    <!-- Payment Popup Modal -->
    <div v-if="isPaymentPopupVisible" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl p-6 w-[90%] max-w-lg shadow-lg flex flex-col gap-4">
        <h2 class="text-center font-bold text-lg text-dark-green">Pilih Metode Pembayaran</h2>
        
        <!-- Payment Method Selection -->
        <div class="flex flex-row gap-4 items-center justify-center">
          <label>
            <input type="radio" v-model="selectedPaymentMethod" value="qris" class="text-dark-green font-semibold" /> QRIS
          </label>
          <label>
            <input type="radio" v-model="selectedPaymentMethod" value="transfer_bank" class="text-dark-green font-semibold" /> Transfer Bank
          </label>
        </div>

        <!-- QR Code for QRIS -->
        <div v-if="selectedPaymentMethod === 'qris'" class="flex flex-col items-center gap-4">
          <img src="..\assets\bayar.svg" alt="QR Code" class="w-40 h-40" />
          <p class="text-center">Scan kode QR untuk melakukan pembayaran</p>
        </div>

        <!-- Bank Transfer Tutorial -->
        <div v-if="selectedPaymentMethod === 'transfer_bank'" class="text-left">
          <h3 class="font-semibold">Detail Pembayaran</h3>
          <ol class="list-decimal list-inside">
            <li>Buka aplikasi M-Banking yang kamu gunakan</li>
            <li>Navigasi ke arah <strong>transfer bank</strong></li>
            <li>Transfer ke nomor rekening berikut: <strong>000111222333</strong></li>
            <li>Masukkan nominal yang tertera pada <strong>Total Pembayaran</strong></li>
            <li>Selesaikan pembayaran</li>
          </ol>
        </div>

        <!-- Popup Buttons -->
        <div class="flex justify-end gap-4 mt-4">
          <btn @click="submitBooking" class="text-white py-2 px-4 rounded-81xl font-bold bg-green">Bayar</btn>
          <btn @click="closePaymentPopup" class="text-white py-2 px-4 rounded-81xl font-bold bg-pastel-red">Batal</btn>
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
      tiket: null,
      availableSeats: [],
      selectedSeat: '',
      metodeTransaksi: '',
      isPaymentPopupVisible: false, // Untuk mengontrol tampilan popup
      selectedPaymentMethod: '', // Menyimpan metode pembayaran yang dipilih
    };
  },
  async created() {
    const tiketId = this.$route.params.id;

    await this.fetchTicketDetails(tiketId);
    await this.fetchAvailableSeats(tiketId);
  },
  methods: {
    async fetchTicketDetails(tiketId) {
      try {
        const response = await axios.get(`http://localhost:5000/api/tikets/${tiketId}`);
        this.tiket = response.data;
      } catch (error) {
        console.error("Error fetching ticket details:", error);
      }
    },
    async fetchAvailableSeats(tiketId) {
      try {
        const response = await axios.get(`http://localhost:5000/api/kursi/available/${tiketId}`);
        this.availableSeats = response.data;
      } catch (error) {
        console.error("Error fetching available seats:", error);
      }
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
    formatHarga(harga) {
      return harga.toLocaleString('id-ID');
    },
    showPaymentPopup() {
      this.isPaymentPopupVisible = true;
    },
    closePaymentPopup() {
      this.isPaymentPopupVisible = false;
    },
    async submitBooking() {
      if (this.selectedSeat && this.selectedPaymentMethod) {
        try {
          const userId = localStorage.getItem('userId');
          if (!userId) {
            alert("User is not logged in.");
            return;
          }

          await axios.post('http://localhost:5000/api/transaksi', {
            id_tiket: this.tiket.id,
            id_kursi: this.selectedSeat,
            id_user: userId,
            metode_transaksi: this.selectedPaymentMethod.toLowerCase(),
          });

          alert("Booking berhasil dibuat dengan status 'pending'");
          this.$router.push('/result');
        } catch (error) {
          console.error("Error during booking:", error);
          alert("Gagal melakukan booking. Silakan coba lagi.");
        }
      } else {
        alert("Silakan pilih kursi dan metode pembayaran sebelum memesan.");
      }
      this.isPaymentPopupVisible = false;
    },
    cancelBooking() {
      this.$router.push('/result');
    }
  },
};
</script>

<style scoped>

</style>
