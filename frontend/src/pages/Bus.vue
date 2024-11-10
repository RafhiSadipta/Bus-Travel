<template enter-class="w-screen h-screen">
    <div
        class="self-stretch relative flex flex-col items-center justify-start py-8 px-16 box-border gap-8 text-left text-12xl">
        <h3>Bus Management</h3>
        <form @submit.prevent="createOrUpdateBus" class="flex flex-col items-center gap-2 w-1/2">
            <div class="flex flex-row gap-2 w-full">
                <div class="w-full rounded-81xl bg-white flex items-center justify-start py-3 px-[1.875rem] box-border">
                    <input v-model="newBus.jenis" placeholder="Jenis Bus" required
                        class="w-full bg-transparent border-none outline-none font-semibold text-sm" />
                </div>
                <div class="w-full rounded-81xl bg-white flex items-center justify-start py-3 px-[1.875rem] box-border">
                    <input v-model="newBus.kapasitas" type="number" placeholder="Kapasitas Bus" required
                        class="w-full bg-transparent border-none outline-none font-semibold text-sm" />
                </div>
            </div>
            <div class="flex flex-col gap-2 w-full">
                <label class="font-semibold text-sm text-center">Fasilitas</label>
                <div class="fasilitas-list w-full bg-white rounded-2xl py-3 px-4 box-border">
                    <div v-for="fasilitas in fasilitasList" :key="fasilitas.id" class="flex items-center gap-2 mb-2">
                        <input type="checkbox" :value="fasilitas.id" v-model="selectedFasilitas"
                            class="w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-green-500" />
                        <span class="text-sm font-semibold">{{ fasilitas.nama }}</span>
                    </div>
                </div>
            </div>

            <div class="flex flex-row gap-2 w-3/4">
            <button type="submit"
                class="w-full rounded-81xl bg-green-600 flex items-center justify-center py-3 px-8 bg-green text-white font-semibold text-sm">
                {{ isEditing ? "Perbarui Bus" : "Tambah Bus" }}
            </button>
            <btn v-if="isEditing" type="button" @click="cancelEdit"
                class="w-full button rounded-81xl bg-pastel-red flex items-center justify-center py-3 px-8 text-white text-sm">
                <b class="flex-1 text-center">Cancel</b>
            </btn>
        </div>
        </form>


        <p v-if="message" :class="{ success: isSuccess, error: !isSuccess }">{{ message }}</p>

        <table v-if="busList.length > 0"
            class="self-stretch border-collapse rounded-2xl overflow-hidden shadow-md border-dark-green">
            <thead>
                <tr class="bg-dark-green">
                    <th class="p-4">Jenis Bus</th>
                    <th class="p-4">Kapasitas</th>
                    <th class="p-4">Fasilitas</th>
                    <th class="p-4">Aksi</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(bus, index) in busList" :key="bus.id"
                    :class="index % 2 === 0 ? 'bg-green-20' : 'bg-white-30'">
                    <td class="p-4">{{ bus.jenis }}</td>
                    <td class="p-4">{{ bus.kapasitas }}</td>
                    <td class="p-4">{{ bus.fasilitas || 'Tidak ada fasilitas' }}</td>
                    <td class="p-4">
                        <btn @click="editBus(bus)"
                            class="bg-pastel-yellow text-white font-bold text-sm px-4 py-2 rounded-31xl">
                            Edit
                        </btn>
                        <btn @click="deleteBus(bus.id)"
                            class="bg-pastel-red text-white font-bold text-sm px-4 py-2 rounded-31xl">
                            Hapus
                        </btn>
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
        cancelEdit() {
            this.resetForm();
        },
    },
};
</script>
