<template enter-class="w-screen h-screen">
  <div
    class="self-stretch relative flex flex-col items-center justify-start py-8 px-16 box-border gap-8 text-left text-12xl">
    <h3>Agent Management</h3>
    <!-- Form Create Agen -->
    <form v-if="!editableAgen" @submit.prevent="createAgen" class="flex flex-col items-center gap-2">
      <div class="flex flex-row gap-2">
        <div class="flex flex-col gap-2">
          <!-- NPP Input -->
          <div
            class="w-[23.75rem] rounded-81xl bg-white flex flex-row items-center justify-start py-3 px-[1.875rem] box-border">
            <input v-model="newAgen.npp" placeholder="NPP" required
              class="w-full bg-transparent border-none outline-none font-semibold text-sm" />
          </div>
          <!-- Nama Agen Input -->
          <div
            class="w-[23.75rem] rounded-81xl bg-white flex flex-row items-center justify-start py-3 px-[1.875rem] box-border">
            <input v-model="newAgen.nama" placeholder="Nama Agen" required
              class="w-full bg-transparent border-none outline-none font-semibold text-sm" />
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <!-- Telepon Input -->
          <div
            class="w-[23.75rem] rounded-81xl bg-white flex flex-row items-center justify-start py-3 px-[1.875rem] box-border">
            <input v-model="newAgen.telepon" placeholder="Nomor Telepon" required
              class="w-full bg-transparent border-none outline-none font-semibold text-sm" />
          </div>
          <!-- File Input and Submit Button in a Row -->
          <div class="flex flex-row gap-2">
            <div
              class="w-full rounded-81xl bg-white flex flex-row items-center justify-start py-3 px-[1.875rem] box-border">
              <input type="file" @change="onFileChange" accept="image/*" ref="fileInput"
                class="w-full bg-transparent border-none outline-none font-semibold text-sm" />
            </div>
          </div>
        </div>
      </div>
      <button type="submit"
        class="w-1/2 button rounded-81xl bg-green flex items-center justify-center py-3 px-8 text-white text-sm">
        <b class="flex-1 text-center">Tambah Agen</b>
      </button>
    </form>

    <p v-if="message" :class="{ success: isSuccess, error: !isSuccess }">{{ message }}</p>

    <!-- Form Edit Agen -->
    <div v-if="editableAgen">
      <form @submit.prevent="saveAgen" class="flex flex-col items-center gap-2">
        <div class="flex flex-row gap-2">
          <div class="flex flex-col gap-2">
            <!-- NPP Input -->
            <div
              class="w-[23.75rem] rounded-81xl bg-white flex flex-row items-center justify-start py-3 px-[1.875rem] box-border">
              <input v-model="editableAgen.npp" placeholder="NPP" required
                class="w-full bg-transparent border-none outline-none font-semibold text-sm" />
            </div>
            <!-- Nama Agen Input -->
            <div
              class="w-[23.75rem] rounded-81xl bg-white flex flex-row items-center justify-start py-3 px-[1.875rem] box-border">
              <input v-model="editableAgen.nama" placeholder="Nama Agen" required
                class="w-full bg-transparent border-none outline-none font-semibold text-sm" />
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <!-- Telepon Input -->
            <div
              class="w-[23.75rem] rounded-81xl bg-white flex flex-row items-center justify-start py-3 px-[1.875rem] box-border">
              <input v-model="editableAgen.telepon" placeholder="Nomor Telepon" required
                class="w-full bg-transparent border-none outline-none font-semibold text-sm" />
            </div>
            <!-- File Input and Action Buttons in a Row -->
            <div class="flex flex-row gap-2">
              <div
                class="w-full rounded-81xl bg-white flex flex-row items-center justify-start py-3 px-[1.875rem] box-border">
                <input type="file" @change="onFileChangeEdit" accept="image/*"
                  class="w-full bg-transparent border-none outline-none font-semibold text-sm" />
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-row w-3/4">
          <button type="submit"
            class="w-full button rounded-81xl bg-green flex items-center justify-center py-3 px-8 text-white text-sm">
            <b class="flex-1 text-center">Simpan</b>
          </button>
          <btn type="button" @click="cancelEdit"
            class="w-full button rounded-81xl bg-pastel-red flex items-center justify-center py-3 px-8 text-white text-sm">
            <b class="flex-1 text-center">Batal</b>
          </btn>
        </div>
      </form>
    </div>

    <!-- Table of Agens -->
    <table v-if="agens.length > 0"
      class="self-stretch border-collapse rounded-2xl overflow-hidden shadow-md border-dark-green">
      <thead>
        <tr class="bg-dark-green">
          <th class="p-4">NPP</th>
          <th class="p-4">Nama</th>
          <th class="p-4">Telepon</th>
          <th class="p-4">Logo</th>
          <th class="p-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(agen, index) in agens" :key="agen.id" :class="index % 2 === 0 ? 'bg-green-20' : 'bg-white-30'">
          <td class="p-4">{{ agen.npp }}</td>
          <td class="p-4">{{ agen.nama }}</td>
          <td class="p-4">{{ agen.telepon }}</td>
          <td class="p-4">
            <img v-if="agen.logo" :src="`http://localhost:5000${agen.logo}`" alt="Logo" width="50" />
            <span v-else>No logo</span>
          </td>
          <td class="p-4">
            <btn @click="editAgen(agen)" class="bg-pastel-yellow text-white font-bold text-sm px-4 py-2 rounded-31xl">
              Edit
            </btn>
            <btn @click="deleteAgen(agen.id)" class="bg-pastel-red text-white font-bold text-sm px-4 py-2 rounded-31xl">
              Delete
            </btn>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No agen data available.</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      agens: [],
      newAgen: { npp: '', nama: '', telepon: '', logo: null },
      editableAgen: null,
      isSuccess: true
    };
  },
  async created() {
    this.loadAgens();
  },
  methods: {
    async loadAgens() {
      try {
        const response = await axios.get('http://localhost:5000/agen');
        this.agens = response.data;
      } catch (error) {
        console.error("Failed to load agens:", error);
      }
    },
    onFileChange(event) {
      this.newAgen.logo = event.target.files[0];
    },
    async createAgen() {
      const formData = new FormData();
      formData.append('npp', this.newAgen.npp);
      formData.append('nama', this.newAgen.nama);
      formData.append('telepon', this.newAgen.telepon);
      if (this.newAgen.logo) formData.append('logo', this.newAgen.logo);

      try {
        await axios.post('http://localhost:5000/agen', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert("Agen berhasil ditambahkan!");
        this.isSuccess = true;
        this.loadAgens();
        this.resetForm();
      } catch (error) {
        console.error("Error adding agen:", error);
        alert("Gagal menambahkan agen. Silakan coba lagi.");
        this.isSuccess = false;
      }
    },
    resetForm() {
      this.newAgen = { npp: '', nama: '', telepon: '', logo: null };
      this.$refs.fileInput.value = '';
    },
    editAgen(agen) {
      this.editableAgen = { ...agen };
    },
    onFileChangeEdit(event) {
      this.editableAgen.logo = event.target.files[0];
    },
    async saveAgen() {
      const formData = new FormData();
      formData.append('npp', this.editableAgen.npp);
      formData.append('nama', this.editableAgen.nama);
      formData.append('telepon', this.editableAgen.telepon);
      if (this.editableAgen.logo) formData.append('logo', this.editableAgen.logo);

      try {
        await axios.put(`http://localhost:5000/agen/${this.editableAgen.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert("Agen berhasil diperbarui!");
        this.isSuccess = true;
        this.loadAgens();
        this.editableAgen = null;
      } catch (error) {
        console.error("Error updating agen:", error);
        alert("Gagal memperbarui agen. Silakan coba lagi.");
        this.isSuccess = false;
      }
    },
    cancelEdit() {
      this.editableAgen = null;
    },
    async deleteAgen(id) {
      try {
        await axios.delete(`http://localhost:5000/agen/${id}`);
        alert("Agen berhasil dihapus!");
        this.isSuccess = true;
        this.loadAgens();
      } catch (error) {
        console.error("Error deleting agen:", error);
        alert("Gagal menghapus agen. Silakan coba lagi.");
        this.isSuccess = false;
      }
    }
  }
};
</script>

