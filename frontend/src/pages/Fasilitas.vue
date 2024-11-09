<template>
    <div>
        <h2>Kelola Fasilitas</h2>
        <form @submit.prevent="createOrUpdateFasilitas">
            <label>Nama Fasilitas:</label>
            <input v-model="newFasilitas.nama" placeholder="Nama Fasilitas" required />

            <label>Deskripsi Fasilitas:</label>
            <textarea v-model="newFasilitas.deskripsi" placeholder="Deskripsi Fasilitas"></textarea>

            <button type="submit">{{ isEditing ? "Perbarui Fasilitas" : "Tambah Fasilitas" }}</button>
        </form>

        <p v-if="message" :class="{ success: isSuccess, error: !isSuccess }">{{ message }}</p>

        <h3>Daftar Fasilitas</h3>
        <table v-if="fasilitasList.length > 0">
            <thead>
                <tr>
                    <th>Nama Fasilitas</th>
                    <th>Deskripsi</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="fasilitas in fasilitasList" :key="fasilitas.id">
                    <td>{{ fasilitas.nama }}</td>
                    <td>{{ fasilitas.deskripsi || 'Tidak ada deskripsi' }}</td>
                    <td>
                        <button @click="editFasilitas(fasilitas)">Edit</button>
                        <button @click="deleteFasilitas(fasilitas.id)">Hapus</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <p v-else>Tidak ada data fasilitas tersedia.</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            fasilitasList: [],
            newFasilitas: { nama: '', deskripsi: '' },
            isEditing: false,
            editingFasilitasId: null,
            message: '',
            isSuccess: true,
        };
    },
    async created() {
        await this.loadFasilitas();
    },
    methods: {
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
        async createFasilitas() {
            try {
                const response = await axios.post('http://localhost:5000/api/fasilitas', this.newFasilitas);
                this.fasilitasList.push(response.data.fasilitas);
                this.message = 'Fasilitas berhasil ditambahkan!';
                this.isSuccess = true;
                this.resetForm();
            } catch (error) {
                console.error('Error adding fasilitas:', error);
                this.message = 'Gagal menambahkan fasilitas. Silakan coba lagi.';
                this.isSuccess = false;
            }
        },
        async updateFasilitas() {
            try {
                await axios.put(`http://localhost:5000/api/fasilitas/${this.editingFasilitasId}`, this.newFasilitas);
                this.message = 'Fasilitas berhasil diperbarui!';
                this.isSuccess = true;
                await this.loadFasilitas();
                this.resetForm();
            } catch (error) {
                console.error('Error updating fasilitas:', error);
                this.message = 'Gagal memperbarui fasilitas. Silakan coba lagi.';
                this.isSuccess = false;
            }
        },
        async createOrUpdateFasilitas() {
            if (this.isEditing) {
                await this.updateFasilitas();
            } else {
                await this.createFasilitas();
            }
        },
        resetForm() {
            this.newFasilitas = { nama: '', deskripsi: '' };
            this.isEditing = false;
            this.editingFasilitasId = null;
        },
        async deleteFasilitas(id) {
            try {
                await axios.delete(`http://localhost:5000/api/fasilitas/${id}`);
                this.fasilitasList = this.fasilitasList.filter(fasilitas => fasilitas.id !== id);
                this.message = 'Fasilitas berhasil dihapus!';
                this.isSuccess = true;
            } catch (error) {
                console.error('Error deleting fasilitas:', error);
                this.message = 'Gagal menghapus fasilitas. Silakan coba lagi.';
                this.isSuccess = false;
            }
        },
        editFasilitas(fasilitas) {
            this.newFasilitas = { nama: fasilitas.nama, deskripsi: fasilitas.deskripsi };
            this.isEditing = true;
            this.editingFasilitasId = fasilitas.id;
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
form textarea,
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