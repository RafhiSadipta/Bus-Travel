<template enter-class="w-screen h-screen">
    <div
        class="self-stretch relative flex flex-col items-center justify-start py-8 px-16 box-border gap-8 text-left text-12xl">
        <h3>Terminal Management</h3>
        <form @submit.prevent="createOrUpdateTerminal" class="flex flex-col items-center gap-2">
                <div class="flex flex-row gap-2">
                    <div
                        class="w-[23.75rem] rounded-81xl bg-white flex flex-row items-center justify-start py-3 px-[1.875rem] box-border">
                        <input v-model="newTerminal.nama" placeholder="Nama Terminal" required
                            class="w-full bg-transparent border-none outline-none font-semibold text-sm" />
                    </div>
                    <div
                        class="w-[23.75rem] rounded-81xl bg-white flex flex-row items-center justify-start py-3 px-[1.875rem] box-border">
                        <input v-model="newTerminal.kota" placeholder="Kota" required
                            class="w-full bg-transparent border-none outline-none font-semibold text-sm" />
                    </div>
                </div>
                <!-- Submit and Conditional Cancel Button -->
                <div class="flex flex-row gap-2 w-3/5">
                    <button type="submit"
                        class="w-full button rounded-81xl bg-green flex items-center justify-center py-3 px-8 text-white text-sm">
                        <b class="flex-1 text-center">{{ isEditing ? "Perbarui Terminal" : "Tambah Terminal" }}</b>
                    </button>
                    <btn v-if="isEditing" type="button" @click="cancelEdit"
                        class="w-full button rounded-81xl bg-pastel-red flex items-center justify-center py-3 px-8 text-white text-sm">
                        <b class="flex-1 text-center">Cancel</b>
                    </btn>
                </div>
        </form>


        <p v-if="message" :class="{ success: isSuccess, error: !isSuccess }">{{ message }}</p>

        <table v-if="terminals.length > 0"
            class="self-stretch border-collapse rounded-2xl overflow-hidden shadow-md border-dark-green">
            <thead>
                <tr class="bg-dark-green">
                    <th class="p-4">Nama Terminal</th>
                    <th class="p-4">Kota</th>
                    <th class="p-4">Aksi</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(terminal, index) in terminals" :key="terminal.id"
                    :class="index % 2 === 0 ? 'bg-green-20' : 'bg-white-30'">
                    <td class="p-4">{{ terminal.nama }}</td>
                    <td class="p-4">{{ terminal.kota }}</td>
                    <td class="p-4">
                        <btn @click="editTerminal(terminal)"
                            class="bg-pastel-yellow text-white font-bold text-sm px-4 py-2 rounded-31xl">
                            Edit
                        </btn>
                        <btn @click="deleteTerminal(terminal.id)"
                            class="bg-pastel-red text-white font-bold text-sm px-4 py-2 rounded-31xl">
                            Hapus
                        </btn>
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
                alert('Terminal berhasil ditambahkan!');
                this.isSuccess = true;
                this.resetForm();
            } catch (error) {
                console.error('Error adding terminal:', error);
                alert('Gagal menambahkan terminal. Silakan coba lagi.');
                this.isSuccess = false;
            }
        },
        async updateTerminal() {
            try {
                await axios.put(`http://localhost:5000/api/terminals/${this.editingTerminalId}`, this.newTerminal);
                alert('Terminal berhasil diperbarui!');
                this.isSuccess = true;
                this.loadTerminals(); // Memuat ulang data terminal
                this.resetForm(); // Reset form setelah update
            } catch (error) {
                console.error('Error updating terminal:', error);
                alert('Gagal memperbarui terminal. Silakan coba lagi.');
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
                alert('Terminal berhasil dihapus!');
                this.isSuccess = true;
            } catch (error) {
                console.error('Error deleting terminal:', error);
                alert('Gagal menghapus terminal. Silakan coba lagi.');
                this.isSuccess = false;
            }
        },
        editTerminal(terminal) {
            this.newTerminal = { ...terminal };
            this.isEditing = true;
            this.editingTerminalId = terminal.id;
        },
        cancelEdit() {
            this.resetForm(); // Mengatur ulang form dan keluar dari mode edit
        },
    },
};
</script>


