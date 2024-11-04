<template>
    <div>
      <h1>User Dashboard</h1>
  
      <!-- Form Create User -->
      <h3>Create New User</h3>
      <form @submit.prevent="createUser">
        <input v-model="newUser.username" placeholder="Username" required />
        <input v-model="newUser.email" type="email" placeholder="Email" required />
        <input v-model="newUser.password" type="password" placeholder="Password" required />
        <select v-model="newUser.role" required>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="agen">Agen</option>
        </select>
        <button type="submit">Create User</button>
      </form>
  
      <!-- Form Edit User -->
      <div v-if="editableUser">
        <h3>Edit User</h3>
        <form @submit.prevent="saveUser">
          <input v-model="editableUser.username" placeholder="Username" required />
          <input v-model="editableUser.email" placeholder="Email" required />
          <select v-model="editableUser.role" required>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="agen">Agen</option>
          </select>
          <button type="submit">Save</button>
          <button type="button" @click="cancelEdit">Cancel</button>
        </form>
      </div>
  
      <!-- Table of Users -->
      <table v-if="users.length > 0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th> <!-- Tambahkan kolom Role -->
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td> <!-- Menampilkan role pengguna -->
            <td>
              <button @click="editUser(user)">Edit</button>
              <button @click="deleteUser(user.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>No users found.</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        users: [], // Daftar pengguna
        newUser: { // Data untuk pengguna baru
          username: '',
          email: '',
          password: '',
          role: 'user' // Menetapkan default role
        },
        editableUser: null // Data pengguna yang sedang diedit
      };
    },
    async created() {
      try {
        // Mengambil daftar pengguna dari backend
        const response = await axios.get('http://localhost:5000/users', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        this.users = response.data;
      } catch (error) {
        console.error(error);
        this.$router.push('/');
      }
    },
    methods: {
      // Fungsi untuk membuat pengguna baru
      async createUser() {
        try {
          const response = await axios.post('http://localhost:5000/auth/register', this.newUser, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
          // Menambahkan pengguna baru ke daftar users
          this.users.push(response.data.user);
          // Reset form
          this.newUser = { username: '', email: '', password: '', role: 'user' }; // Reset role juga
          alert("User created successfully");
        } catch (error) {
          console.error(error);
          alert("Failed to create user.");
        }
      },
  
      // Fungsi untuk memulai edit pengguna
      editUser(user) {
        this.editableUser = { ...user }; // Membuat salinan data user untuk diedit
      },
  
      // Fungsi untuk menyimpan perubahan pengguna
      async saveUser() {
        try {
          await axios.put(`http://localhost:5000/users/${this.editableUser.id}`, this.editableUser, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
          // Perbarui data pengguna di daftar users
          const index = this.users.findIndex(user => user.id === this.editableUser.id);
          if (index !== -1) {
            this.users.splice(index, 1, this.editableUser);
          }
          this.editableUser = null; // Tutup form edit
          alert("User updated successfully");
        } catch (error) {
          console.error(error);
          alert("Failed to update user.");
        }
      },
  
      // Fungsi untuk membatalkan edit
      cancelEdit() {
        this.editableUser = null;
      },
  
      // Fungsi untuk menghapus pengguna
      async deleteUser(id) {
        try {
          await axios.delete(`http://localhost:5000/users/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
          // Hapus pengguna dari daftar users
          this.users = this.users.filter(user => user.id !== id);
          alert("User deleted successfully");
        } catch (error) {
          console.error(error);
          alert("Failed to delete user.");
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Styling dasar untuk Dashboard */
  h1, h3 {
    color: #333;
  }
  
  form {
    margin-bottom: 20px;
  }
  
  input {
    margin-right: 10px;
    padding: 5px;
  }
  
  button {
    margin-right: 10px;
    padding: 5px 10px;
    cursor: pointer;
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
    padding: 10px;
    text-align: left;
  }
  
  th {
    background-color: #f4f4f4;
  }
  </style>
  