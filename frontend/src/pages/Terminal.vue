<template>
    <div>
        <h2>Kelola Terminal</h2>
        <form @submit.prevent="createOrUpdateTerminal">
            <input v-model="newTerminal.nama" placeholder="Nama Terminal" required />
            <input v-model="newTerminal.kota" placeholder="Kota" required />
            <button type="submit">{{ isEditing ? "Perbarui Terminal" : "Tambah Terminal" }}</button>
        </form>

        <p v-if="message" :class="{ success: isSuccess, error: !isSuccess }">{{ message }}</p>

        <table v-if="terminals.length > 0">
            <thead>
                <tr>
                    <th>Nama Terminal</th>
                    <th>Kota</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="terminal in terminals" :key="terminal.id">
                    <td>{{ terminal.nama }}</td>
                    <td>{{ terminal.kota }}</td>
                    <td>
                        <button @click="editTerminal(terminal)">Edit</button>
                        <button @click="deleteTerminal(terminal.id)">Hapus</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <p v-else>Tidak ada data terminal tersedia.</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            terminals: [],
            newTerminal: { nama: '', kota: '' },
            isEditing: false,
            editingTerminalId: null,
            message: '',
            isSuccess: true,
        };
    },
    async created() {
        this.loadTerminals();
    },
    methods: {
        async loadTerminals() {
            try {
                const response = await axios.get('http://localhost:5000/api/terminals');
                this.terminals = response.data;
            } catch (error) {
                console.error('Failed to load terminals:', error);
            }
        },
        async createTerminal() {
            try {
                const response = await axios.post('http://localhost:5000/api/terminals', this.newTerminal);
                this.terminals.push(response.data.terminal);
                this.message = 'Terminal berhasil ditambahkan!';
                this.isSuccess = true;
                this.resetForm();
            } catch (error) {
                console.error('Error adding terminal:', error);
                this.message = 'Gagal menambahkan terminal. Silakan coba lagi.';
                this.isSuccess = false;
            }
        },
        async updateTerminal() {
            try {
                await axios.put(`http://localhost:5000/api/terminals/${this.editingTerminalId}`, this.newTerminal);
                this.message = 'Terminal berhasil diperbarui!';
                this.isSuccess = true;
                this.loadTerminals(); // Memuat ulang data terminal
                this.resetForm(); // Reset form setelah update
            } catch (error) {
                console.error('Error updating terminal:', error);
                this.message = 'Gagal memperbarui terminal. Silakan coba lagi.';
                this.isSuccess = false;
            }
        },
        async createOrUpdateTerminal() {
            if (this.isEditing) {
                await this.updateTerminal();
            } else {
                await this.createTerminal();
            }
        },
        resetForm() {
            this.newTerminal = { nama: '', kota: '' };
            this.isEditing = false;
            this.editingTerminalId = null;
        },
        async deleteTerminal(id) {
            try {
                await axios.delete(`http://localhost:5000/api/terminals/${id}`);
                this.terminals = this.terminals.filter(terminal => terminal.id !== id);
                this.message = 'Terminal berhasil dihapus!';
                this.isSuccess = true;
            } catch (error) {
                console.error('Error deleting terminal:', error);
                this.message = 'Gagal menghapus terminal. Silakan coba lagi.';
                this.isSuccess = false;
            }
        },
        editTerminal(terminal) {
            this.newTerminal = { ...terminal };
            this.isEditing = true;
            this.editingTerminalId = terminal.id;
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