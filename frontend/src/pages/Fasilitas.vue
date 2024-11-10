<template enter-class="w-screen h-screen">
    <div
        class="self-stretch relative flex flex-col items-center justify-start py-8 px-16 box-border gap-8 text-left text-12xl">
        <h3>Facility Management</h3>
        <form @submit.prevent="createOrUpdateFasilitas" class="flex flex-col items-center gap-4 w-1/2">
            <!-- Nama Fasilitas -->
            <div class="flex flex-col gap-2 w-full">
                <div class="w-full rounded-81xl bg-white flex items-center justify-start py-3 px-[1.875rem] box-border">
                    <input v-model="newFasilitas.nama" placeholder="Nama Fasilitas" required
                        class="w-full bg-transparent border-none outline-none font-semibold text-sm" />
                </div>
            </div>

            <!-- Deskripsi Fasilitas -->
            <div class="flex flex-col gap-2 w-full">
                <div class="w-full rounded-2xl bg-white flex items-center justify-start py-3 px-[1.875rem] box-border">
                    <textarea v-model="newFasilitas.deskripsi" placeholder="Deskripsi Fasilitas" rows="3"
                        class="w-full bg-transparent border-none outline-none font-semibold text-sm resize-none"></textarea>
                </div>
            </div>

            <!-- Submit Button -->
            <div class="flex flex-row gap-2 w-3/4">
                <button type="submit"
                    class="w-full rounded-81xl bg-green-600 flex items-center justify-center py-3 px-8 bg-green text-white font-semibold text-sm">
                    {{ isEditing ? "Perbarui Fasilitas" : "Tambah Fasilitas" }}
                </button>
                <btn v-if="isEditing" type="button" @click="cancelEdit"
                    class="w-full button rounded-81xl bg-pastel-red flex items-center justify-center py-3 px-8 text-white text-sm">
                    <b class="flex-1 text-center">Cancel</b>
                </btn>
            </div>
        </form>


        <p v-if="message" :class="{ success: isSuccess, error: !isSuccess }">{{ message }}</p>

        <table v-if="fasilitasList.length > 0"
            class="self-stretch border-collapse rounded-2xl overflow-hidden shadow-md border-dark-green">
            <thead>
                <tr class="bg-dark-green">
                    <th class="p-4">Nama Fasilitas</th>
                    <th class="p-4">Deskripsi</th>
                    <th class="p-4">Aksi</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(fasilitas, index) in fasilitasList" :key="fasilitas.id"
                    :class="index % 2 === 0 ? 'bg-green-20' : 'bg-white-30'">
                    <td class="p-4">{{ fasilitas.nama }}</td>
                    <td class="p-4">{{ fasilitas.deskripsi || 'Tidak ada deskripsi' }}</td>
                    <td class="p-4">
                        <btn @click="editFasilitas(fasilitas)"
                            class="bg-pastel-yellow text-white font-bold text-sm px-4 py-2 rounded-31xl">
                            Edit
                        </btn>
                        <btn @click="deleteFasilitas(fasilitas.id)"
                            class="bg-pastel-red text-white font-bold text-sm px-4 py-2 rounded-31xl">
                            Hapus
                        </btn>
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
        cancelEdit() {
            this.resetForm(); // Mengatur ulang form dan keluar dari mode edit
        },
    },
};
</script>
