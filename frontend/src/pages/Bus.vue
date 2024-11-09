<template>
    <div>
        <h2>Kelola Bus</h2>
        <form @submit.prevent="createOrUpdateBus">
            <label>Jenis Bus:</label>
            <input v-model="newBus.jenis" placeholder="Jenis Bus (Eksekutif, Double Decker, dll.)" required />

            <label>Kapasitas:</label>
            <input v-model="newBus.kapasitas" type="number" placeholder="Kapasitas Bus" required />

            <label>Fasilitas:</label>
            <div class="fasilitas-list">
                <div v-for="fasilitas in fasilitasList" :key="fasilitas.id">
                    <input type="checkbox" :value="fasilitas.id" v-model="selectedFasilitas" />
                    <span>{{ fasilitas.nama }}</span>
                </div>
            </div>

            <button type="submit">{{ isEditing ? "Perbarui Bus" : "Tambah Bus" }}</button>
        </form>

        <p v-if="message" :class="{ success: isSuccess, error: !isSuccess }">{{ message }}</p>

        <h3>Daftar Bus</h3>
        <table v-if="busList.length > 0">
            <thead>
                <tr>
                    <th>Jenis Bus</th>
                    <th>Kapasitas</th>
                    <th>Fasilitas</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="bus in busList" :key="bus.id">
                    <td>{{ bus.jenis }}</td>
                    <td>{{ bus.kapasitas }}</td>
                    <td>{{ bus.fasilitas || 'Tidak ada fasilitas' }}</td>
                    <td>
                        <button @click="editBus(bus)">Edit</button>
                        <button @click="deleteBus(bus.id)">Hapus</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <p v-else>Tidak ada data bus tersedia.</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            busList: [],
            fasilitasList: [],
            selectedFasilitas: [],
            newBus: { jenis: '', kapasitas: '' },
            isEditing: false,
            editingBusId: null,
            message: '',
            isSuccess: true,
        };
    },
    async created() {
        await this.loadBuses();
        await this.loadFasilitas();
    },
    methods: {
        async loadBuses() {
            try {
                const response = await axios.get('http://localhost:5000/api/buses');
                this.busList = response.data;
            } catch (error) {
                console.error('Failed to load buses:', error);
                this.message = 'Gagal memuat data bus.';
                this.isSuccess = false;
            }
        },
        async loadFasilitas() {
            try {
                const response = await axios.get('http://localhost:5000/api/fasilitas');
                this.fasilitasList = response.data;
            } catch (error) {
                console.error('Failed to load fasilitas:', error);
                this.message = 'Gagal memuat data fasilitas.';
                this.isSuccess = false;
            }
        },
        async createBus() {
            try {
                const response = await axios.post('http://localhost:5000/api/buses', {
                    jenis: this.newBus.jenis,
                    kapasitas: this.newBus.kapasitas,
                    fasilitasIds: this.selectedFasilitas,
                });
                this.busList.push(response.data.bus);
                this.message = 'Bus berhasil ditambahkan!';
                this.isSuccess = true;
                this.resetForm();
            } catch (error) {
                console.error('Error adding bus:', error);
                this.message = 'Gagal menambahkan bus. Silakan coba lagi.';
                this.isSuccess = false;
            }
        },
        async updateBus() {
            try {
                await axios.put(`http://localhost:5000/api/buses/${this.editingBusId}`, {
                    jenis: this.newBus.jenis,
                    kapasitas: this.newBus.kapasitas,
                    fasilitasIds: this.selectedFasilitas,
                });
                this.message = 'Bus berhasil diperbarui!';
                this.isSuccess = true;
                await this.loadBuses(); // Refresh data bus setelah update
                this.resetForm();
            } catch (error) {
                console.error('Error updating bus:', error);
                this.message = 'Gagal memperbarui bus. Silakan coba lagi.';
                this.isSuccess = false;
            }
        },
        async createOrUpdateBus() {
            if (this.isEditing) {
                await this.updateBus();
            } else {
                await this.createBus();
            }
        },
        resetForm() {
            this.newBus = { jenis: '', kapasitas: '' };
            this.selectedFasilitas = [];
            this.isEditing = false;
            this.editingBusId = null;
        },
        async deleteBus(id) {
            try {
                await axios.delete(`http://localhost:5000/api/buses/${id}`);
                this.busList = this.busList.filter(bus => bus.id !== id);
                this.message = 'Bus berhasil dihapus!';
                this.isSuccess = true;
            } catch (error) {
                console.error('Error deleting bus:', error);
                this.message = 'Gagal menghapus bus. Silakan coba lagi.';
                this.isSuccess = false;
            }
        },
        editBus(bus) {
            this.newBus = { jenis: bus.jenis, kapasitas: bus.kapasitas };
            this.selectedFasilitas = bus.fasilitas_ids || []; // Isi fasilitas yang dipilih saat ini
            this.isEditing = true;
            this.editingBusId = bus.id;
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
form button,
form textarea {
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

.fasilitas-list {
    display: flex;
    flex-direction: column;
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