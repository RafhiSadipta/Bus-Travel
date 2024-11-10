<template>
    <div class="transaksi">
      <h2>Pesan Tiket</h2>
      <div v-if="tiket">
        <p><strong>ID Tiket:</strong> {{ tiket.id }}</p>
        <p><strong>Nama Agen:</strong> {{ tiket.nama_agen }}</p>
        <p><strong>Jadwal Berangkat:</strong> {{ formatDate(tiket.waktu_berangkat) }}</p>
        <p><strong>Estimasi Sampai:</strong> {{ formatDate(tiket.estimasi_sampai) }}</p>
        <p><strong>Durasi:</strong> {{ calculateDuration(tiket.waktu_berangkat, tiket.estimasi_sampai) }}</p>
        <p><strong>Harga:</strong> Rp {{ formatHarga(tiket.harga) }}</p>
  
        <h3>Pilih Kursi</h3>
        <div v-if="availableSeats.length > 0">
          <ul>
            <li v-for="kursi in availableSeats" :key="kursi.id">
              <label>
                <input
                  type="radio"
                  :value="kursi.id"
                  v-model="selectedSeat"
                />
                {{ kursi.kode_kursi }}
              </label>
            </li>
          </ul>
        </div>
        <p v-else>Tidak ada kursi yang tersedia.</p>
  
        <h3>Pilih Metode Pembayaran</h3>
        <div>
          <label>
            <input type="radio" value="QRIS" v-model="metodeTransaksi" />
            QRIS
          </label>
          <label>
            <input type="radio" value="Transfer Bank" v-model="metodeTransaksi" />
            Transfer Bank
          </label>
        </div>
  
        <button @click="submitBooking">Pesan Sekarang</button>
        <button @click="cancelBooking" class="cancel-button">Batal</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        tiket: null,
        availableSeats: [], // Store seats with both id and kode_kursi
        selectedSeat: '', // Store the selected seat's id, not kode_kursi
        metodeTransaksi: '',
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
          this.availableSeats = response.data; // Ensure this data contains both id and kode_kursi
        } catch (error) {
          console.error("Error fetching available seats:", error);
        }
      },
      formatDate(date) {
        return new Date(date).toLocaleDateString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      },
      formatHarga(harga) {
        return harga.toLocaleString('id-ID');
      },
      calculateDuration(start, end) {
        const startTime = new Date(start);
        const endTime = new Date(end);
        const diffInHours = Math.abs(endTime - startTime) / 36e5;
        return `${Math.floor(diffInHours)} jam ${Math.floor((diffInHours % 1) * 60)} menit`;
      },
      async submitBooking() {
        if (this.selectedSeat && this.metodeTransaksi) {
          try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
              alert("User is not logged in.");
              return;
            }
  
            const metodeTransaksiLower = this.metodeTransaksi.toLowerCase();
  
            await axios.post('http://localhost:5000/api/transaksi', {
              id_tiket: this.tiket.id,
              id_kursi: this.selectedSeat, // Use the selected seat's id
              id_user: userId,
              metode_transaksi: metodeTransaksiLower,
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
      },
      cancelBooking() {
        this.$router.push('/result');
      }
    },
  };
  </script>
  
  <style scoped>
  .cancel-button {
    background-color: #ffcccc;
    color: #333;
    border: none;
    padding: 10px;
    margin-top: 10px;
    cursor: pointer;
  }
  .cancel-button:hover {
    background-color: #ff9999;
  }
  </style>
  