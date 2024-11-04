<template>
    <div>
      <h2>Kelola Agen</h2>
      <form @submit.prevent="createAgen">
        <input v-model="newAgen.npp" placeholder="NPP" required />
        <input v-model="newAgen.nama" placeholder="Nama Agen" required />
        <input v-model="newAgen.telepon" placeholder="Nomor Telepon" required />
        <input type="file" @change="onFileChange" accept="image/*" ref="fileInput" />
        <button type="submit">Tambah Agen</button>
      </form>
  
      <p v-if="message" :class="{ success: isSuccess, error: !isSuccess }">{{ message }}</p>
  
      <table v-if="agens.length > 0">
        <thead>
          <tr>
            <th>NPP</th>
            <th>Nama</th>
            <th>Telepon</th>
            <th>Logo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="agen in agens" :key="agen.id">
            <td>{{ agen.npp }}</td>
            <td>{{ agen.nama }}</td>
            <td>{{ agen.telepon }}</td>
            <td>
              <img v-if="agen.logo" :src="`http://localhost:5000${agen.logo}`" alt="Logo" width="50" />
              <span v-else>No logo</span>
            </td>
            <td>
              <button @click="editAgen(agen)">Edit</button>
              <button @click="deleteAgen(agen.id)">Delete</button>
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
        message: '',
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
          this.agens = response.data; // Menyimpan data agen yang diambil
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
          this.message = "Agen berhasil ditambahkan!";
          this.isSuccess = true;
          this.loadAgens(); // Refresh daftar agen setelah penambahan
          this.resetForm(); // Reset form setelah sukses
        } catch (error) {
          console.error("Error adding agen:", error);
          this.message = "Gagal menambahkan agen. Silakan coba lagi.";
          this.isSuccess = false;
        }
      },
      resetForm() {
        this.newAgen = { npp: '', nama: '', telepon: '', logo: null };
        this.$refs.fileInput.value = ''; // Reset file input
      },
      async deleteAgen(id) {
        try {
          await axios.delete(`http://localhost:5000/agen/${id}`);
          this.message = "Agen berhasil dihapus!";
          this.isSuccess = true;
          this.loadAgens(); // Refresh daftar agen setelah penghapusan
        } catch (error) {
          console.error("Error deleting agen:", error);
          this.message = "Gagal menghapus agen. Silakan coba lagi.";
          this.isSuccess = false;
        }
      }
    }
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

form input, form button {
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

table, th, td {
  border: 1px solid #ddd;
}

th, td {
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

img {
  border-radius: 4px;
}

  </style>
  