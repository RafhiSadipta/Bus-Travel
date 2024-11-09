<template>
    <div>
        <h2>Kelola Tiket</h2>
        <form @submit.prevent="createOrUpdateTiket">
            <label>Agen:</label>
            <select v-model="newTiket.id_agen" required>
                <option value="" disabled>Pilih Agen</option>
                <option v-for="agen in agenList" :key="agen.id" :value="agen.id">
                    {{ agen.nama }}
                </option>
            </select>

            <label>Bus:</label>
            <select v-model="newTiket.id_bus" required>
                <option value="" disabled>Pilih Bus</option>
                <option v-for="bus in busList" :key="bus.id" :value="bus.id">
                    {{ bus.jenis }} (Kapasitas: {{ bus.kapasitas }})
                </option>
            </select>

            <label>Rute:</label>
            <select v-model="newTiket.id_rute" required>
                <option value="" disabled>Pilih Rute</option>
                <option v-for="rute in ruteList" :key="rute.id" :value="rute.id">
                    {{ rute.terminal_awal_nama }} ({{ rute.terminal_awal_kota }}) - {{ rute.terminal_akhir_nama }} ({{
                        rute.terminal_akhir_kota }})
                </option>
            </select>

            <label>Waktu Berangkat:</label>
            <input type="datetime-local" v-model="newTiket.waktu_berangkat" required />

            <label>Estimasi Sampai:</label>
            <input type="datetime-local" v-model="newTiket.estimasi_sampai" required />

            <label>Harga:</label>
            <input type="number" v-model="newTiket.harga" placeholder="Harga (tanpa desimal)" required />

            <button type="submit">{{ isEditing ? "Perbarui Tiket" : "Tambah Tiket" }}</button>
        </form>

        <p v-if="message" :class="{ success: isSuccess, error: !isSuccess }">{{ message }}</p>

        <h3>Daftar Tiket</h3>
        <table v-if="tiketList.length > 0">
            <thead>
                <tr>
                    <th>Agen</th>
                    <th>Bus</th>
                    <th>Rute</th>
                    <th>Waktu Berangkat</th>
                    <th>Estimasi Sampai</th>
                    <th>Harga</th>
                    <th>Kursi Tersedia</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="tiket in tiketList" :key="tiket.id">
                    <td>{{ tiket.nama_agen }}</td>
                    <td>{{ tiket.jenis_bus }}</td>
                    <td>
                        {{ tiket.terminal_awal_nama }} ({{ tiket.terminal_awal_kota }}) -
                        {{ tiket.terminal_akhir_nama }} ({{ tiket.terminal_akhir_kota }})
                    </td>
                    <td>{{ formatDate(tiket.waktu_berangkat) }}</td>
                    <td>{{ formatDate(tiket.estimasi_sampai) }}</td>
                    <td>{{ formatHarga(tiket.harga) }}</td>
                    <td>{{ tiket.kursi_tersedia }}</td>
                    <td>
                        <button @click="editTiket(tiket)">Edit</button>
                        <button @click="deleteTiket(tiket.id)">Hapus</button>
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
    },
};
</script>

<style scoped>
.success {
    color: green;
}

.error {
    color: red;
}

form {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 400px;
}

form input,
form select,
form button {
    padding: 10px;
    font-size: 16px;
}

form button {
    cursor: pointer;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
}

form button:hover {
    background-color: #45a049;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

table,
th,
td {
    border: 1px solid #ddd;
}

th,
td {
    padding: 12px;
    text-align: left;
}

th {
    background-color: #4CAF50;
    color: white;
}

tbody tr:nth-child(even) {
    background-color: #f2f2f2;
}

tbody tr:hover {
    background-color: #ddd;
}

button {
    padding: 5px 10px;
    margin: 0 5px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}
</style>