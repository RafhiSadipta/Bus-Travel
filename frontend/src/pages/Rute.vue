<template enter-class="w-screen h-screen">
    <div
        class="self-stretch relative flex flex-col items-center justify-start py-8 px-16 box-border gap-8 text-left text-12xl">
        <h3>Route Management</h3>
        <form @submit.prevent="createOrUpdateRute" class="flex flex-col items-center gap-4">
            <div class="flex flex-row gap-2">
                    <div
                        class="w-full rounded-81xl bg-white flex flex-row items-center justify-start py-3 px-[1.875rem] box-border">
                        <select v-model="newRute.id_terminal_awal" required
                            class="w-full bg-transparent border-none outline-none font-semibold text-sm">
                            <option value="" disabled selected>Terminal Awal</option>
                            <option v-for="terminal in filteredTerminals" :key="terminal.id" :value="terminal.id">
                                {{ terminal.nama }} - {{ terminal.kota }}
                            </option>
                        </select>
                    </div>

                <!-- Terminal Akhir -->
                    <div
                        class="w-full rounded-81xl bg-white flex flex-row items-center justify-start py-3 px-[1.875rem] box-border">
                        <select v-model="newRute.id_terminal_akhir" required
                            class="w-full bg-transparent border-none outline-none font-semibold text-sm">
                            <option value="" disabled selected>Terminal Akhir</option>
                            <option v-for="terminal in filteredTerminals" :key="terminal.id" :value="terminal.id">
                                {{ terminal.nama }} - {{ terminal.kota }}
                            </option>
                        </select>
                    </div>
            </div>
            <!-- Submit Button -->
            <div class="flex flex-row gap-2 w-3/4">
                <button type="submit"
                    class="w-full rounded-81xl bg-green-600 flex items-center justify-center py-3 px-8 bg-green text-white font-semibold text-sm">
                    {{ isEditing ? "Perbarui Rute" : "Tambah Rute" }}
                </button>
                <btn v-if="isEditing" type="button" @click="cancelEdit"
                    class="w-full button rounded-81xl bg-pastel-red flex items-center justify-center py-3 px-8 text-white text-sm">
                    <b class="flex-1 text-center">Cancel</b>
                </btn>
            </div>
        </form>


        <p v-if="message" :class="{ success: isSuccess, error: !isSuccess }">{{ message }}</p>

        <!-- <h3>Daftar Rute</h3>
        <input v-model="searchTerm" @input="filterTerminals" placeholder="Cari terminal..." /> -->

        <table v-if="rutes.length > 0"
            class="self-stretch border-collapse rounded-2xl overflow-hidden shadow-md border-dark-green">
            <thead>
                <tr class="bg-dark-green">
                    <th class="p-4">Terminal Awal</th>
                    <th class="p-4">Terminal Akhir</th>
                    <th class="p-4">Aksi</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(rute, index) in rutes" :key="rute.id"
                    :class="index % 2 === 0 ? 'bg-green-20' : 'bg-white-30'">
                    <td class="p-4">{{ rute.terminal_awal_nama }} ({{ rute.terminal_awal_kota }})</td>
                    <td class="p-4">{{ rute.terminal_akhir_nama }} ({{ rute.terminal_akhir_kota }})</td>
                    <td class="p-4">
                        <btn @click="editRute(rute)"
                            class="bg-pastel-yellow text-white font-bold text-sm px-4 py-2 rounded-31xl">
                            Edit
                        </btn>
                        <btn @click="deleteRute(rute.id)"
                            class="bg-pastel-red text-white font-bold text-sm px-4 py-2 rounded-31xl">
                            Hapus
                        </btn>
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
        cancelEdit() {
            this.resetForm(); // Mengatur ulang form dan keluar dari mode edit
        },
    },
};
</script>
