<template>
    <div>
        <h2>Kelola Rute</h2>
        <form @submit.prevent="createOrUpdateRute">
            <label>Terminal Awal:</label>
            <select v-model="newRute.id_terminal_awal" required>
                <option v-for="terminal in filteredTerminals" :key="terminal.id" :value="terminal.id">
                    {{ terminal.nama }} - {{ terminal.kota }}
                </option>
            </select>

            <label>Terminal Akhir:</label>
            <select v-model="newRute.id_terminal_akhir" required>
                <option v-for="terminal in filteredTerminals" :key="terminal.id" :value="terminal.id">
                    {{ terminal.nama }} - {{ terminal.kota }}
                </option>
            </select>

            <button type="submit">{{ isEditing ? "Perbarui Rute" : "Tambah Rute" }}</button>
        </form>

        <p v-if="message" :class="{ success: isSuccess, error: !isSuccess }">{{ message }}</p>

        <h3>Daftar Rute</h3>
        <input v-model="searchTerm" @input="filterTerminals" placeholder="Cari terminal..." />

        <table v-if="rutes.length > 0">
            <thead>
                <tr>
                    <th>Terminal Awal</th>
                    <th>Terminal Akhir</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="rute in rutes" :key="rute.id">
                    <td>{{ rute.terminal_awal_nama }} ({{ rute.terminal_awal_kota }})</td>
                    <td>{{ rute.terminal_akhir_nama }} ({{ rute.terminal_akhir_kota }})</td>
                    <td>
                        <button @click="editRute(rute)">Edit</button>
                        <button @click="deleteRute(rute.id)">Hapus</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <p v-else>Tidak ada data rute tersedia.</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            terminals: [],
            filteredTerminals: [],
            searchTerm: '',
            rutes: [],
            newRute: { id_terminal_awal: '', id_terminal_akhir: '' },
            isEditing: false,
            editingRuteId: null,
            message: '',
            isSuccess: true,
        };
    },
    async created() {
        await this.loadTerminals();
        await this.loadRutes();
    },
    methods: {
        async loadTerminals() {
            try {
                const response = await axios.get('http://localhost:5000/api/terminals');
                this.terminals = response.data;
                this.filteredTerminals = response.data;
            } catch (error) {
                console.error('Failed to load terminals:', error);
            }
        },
        async loadRutes() {
            try {
                const response = await axios.get('http://localhost:5000/api/rutes');
                this.rutes = response.data;
            } catch (error) {
                console.error('Failed to load rutes:', error);
            }
        },
        async createRute() {
            try {
                const response = await axios.post('http://localhost:5000/api/rutes', this.newRute);
                this.rutes.push(response.data.rute);
                this.message = 'Rute berhasil ditambahkan!';
                this.isSuccess = true;
                this.resetForm();
            } catch (error) {
                console.error('Error adding rute:', error);
                this.message = 'Gagal menambahkan rute. Silakan coba lagi.';
                this.isSuccess = false;
            }
        },
        async updateRute() {
            try {
                await axios.put(`http://localhost:5000/api/rutes/${this.editingRuteId}`, this.newRute);
                this.message = 'Rute berhasil diperbarui!';
                this.isSuccess = true;
                await this.loadRutes();
                this.resetForm();
            } catch (error) {
                console.error('Error updating rute:', error);
                this.message = 'Gagal memperbarui rute. Silakan coba lagi.';
                this.isSuccess = false;
            }
        },
        async createOrUpdateRute() {
            if (this.isEditing) {
                await this.updateRute();
            } else {
                await this.createRute();
            }
        },
        resetForm() {
            this.newRute = { id_terminal_awal: '', id_terminal_akhir: '' };
            this.isEditing = false;
            this.editingRuteId = null;
        },
        async deleteRute(id) {
            try {
                await axios.delete(`http://localhost:5000/api/rutes/${id}`);
                this.rutes = this.rutes.filter(rute => rute.id !== id);
                this.message = 'Rute berhasil dihapus!';
                this.isSuccess = true;
            } catch (error) {
                console.error('Error deleting rute:', error);
                this.message = 'Gagal menghapus rute. Silakan coba lagi.';
                this.isSuccess = false;
            }
        },
        editRute(rute) {
            this.newRute = {
                id_terminal_awal: rute.id_terminal_awal,
                id_terminal_akhir: rute.id_terminal_akhir,
            };
            this.isEditing = true;
            this.editingRuteId = rute.id;
        },
        filterTerminals() {
            const searchTermLower = this.searchTerm.toLowerCase();
            this.filteredTerminals = this.terminals.filter(terminal =>
                `${terminal.nama} - ${terminal.kota}`.toLowerCase().includes(searchTermLower)
            );
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