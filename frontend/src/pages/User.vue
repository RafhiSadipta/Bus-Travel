<template enter-class="w-screen h-screen">
  <div
    class="self-stretch relative flex flex-col items-center justify-start py-8 px-16 box-border gap-8 text-left text-12xl">
    <h3>User Management</h3>

    <!-- Form Create User -->
    <form v-if="!editableUser" @submit.prevent="createUser" class="flex flex-col items-center gap-2">
      <div class="flex flex-row gap-2">
        <div class="flex flex-col gap-2">
          <!-- Username Input -->
          <div
            class="w-[23.75rem] rounded-81xl bg-white flex flex-row items-center justify-start py-3 px-[1.875rem] box-border">
            <input v-model="newUser.username" placeholder="Username" required
              class="w-full bg-transparent border-none outline-none font-semibold text-sm" />
          </div>
          <!-- Email Input -->
          <div
            class="w-[23.75rem] rounded-81xl bg-white flex flex-row items-center justify-start py-3 px-[1.875rem] box-border">
            <input v-model="newUser.email" type="email" placeholder="Email" required
              class="w-full bg-transparent border-none outline-none font-semibold text-sm" />
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <!-- Password Input -->
          <div
            class="w-[23.75rem] rounded-81xl bg-white flex flex-row items-center justify-start py-3 px-[1.875rem] box-border">
            <input v-model="newUser.password" type="password" placeholder="Password" required
              class="w-full bg-transparent border-none outline-none font-semibold text-sm" />
          </div>
          <!-- Role Select and Create Button in a Row -->
          <div class="flex flex-row gap-2">
            <div
              class="w-1/2 rounded-81xl bg-white flex flex-row items-center justify-start py-3 px-[1.875rem] box-border">
              <select v-model="newUser.role" required
                class="w-full bg-transparent border-none outline-none font-semibold text-sm">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit"
              class="w-1/2 button rounded-81xl bg-green flex items-center justify-center py-3 px-8 text-white text-sm">
              <b class="flex-1 text-center">Create User</b>
            </button>
          </div>
        </div>
      </div>
    </form>

    <!-- Form Edit User (hanya muncul jika sedang mengedit user) -->
    <div v-if="editableUser">
      <form @submit.prevent="saveUser" class="flex flex-col items-center gap-2">
        <div class="flex flex-row gap-2">
          <!-- Username Input -->
          <div class="flex flex-col gap-2">
            <div
              class="w-[23.75rem] rounded-81xl bg-white flex flex-row items-center justify-start py-3 px-[1.875rem] box-border">
              <input v-model="editableUser.username" placeholder="Username" required
                class="w-full bg-transparent border-none outline-none font-semibold text-sm" />
            </div>

            <!-- Email Input -->
            <div
              class="w-[23.75rem] rounded-81xl bg-white flex flex-row items-center justify-start py-3 px-[1.875rem] box-border">
              <input v-model="editableUser.email" type="email" placeholder="Email" required
                class="w-full bg-transparent border-none outline-none font-semibold text-sm" />
            </div>
          </div>

          <!-- Role Select -->
          <div class="flex flex-col gap-2">
            <div
              class="w-[23.75rem] rounded-81xl bg-white flex flex-row items-center justify-start py-3 px-[1.875rem] box-border">
              <select v-model="editableUser.role" required 
                class="w-full bg-transparent border-none outline-none font-semibold text-sm">
                <option class="text-dark-green-50" value="" disabled selected>Role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div class="flex flex-row gap-2">
              <button type="submit"
                class="w-1/2 button rounded-81xl bg-green flex items-center justify-center py-3 px-12 text-white text-sm">
                <b class="flex-1 text-center">Save</b>
              </button>
              <btn type="button" @click="cancelEdit"
                class="w-1/2 button rounded-81xl bg-pastel-red flex items-center justify-center py-3 px-12 text-white text-sm">
                <b class="flex-1 text-center">Cancel</b>
              </btn>
            </div>
          </div>
        </div>
      </form>
    </div>

    <!-- Table of Users -->
    <table v-if="users.length > 0"
      class="self-stretch border-collapse rounded-2xl overflow-hidden shadow-md border-dark-green">
      <thead>
        <tr class="bg-dark-green">
          <th>ID</th>
          <th>USERNAME</th>
          <th>EMAIL</th>
          <th>ROLE</th>
          <th>ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="user.id" :class="index % 2 === 0 ? 'bg-green-20' : 'bg-white-30'">
          <td class="p-4">{{ user.id }}</td>
          <td class="p-4">{{ user.username }}</td>
          <td class="p-4">{{ user.email }}</td>
          <td class="p-4">{{ user.role }}</td>
          <td class="p-4">
            <btn @click="editUser(user)" class="bg-pastel-yellow text-white font-bold text-sm px-4 py-2 rounded-31xl">
              EDIT
            </btn>
            <btn @click="deleteUser(user.id)" class="bg-pastel-red text-white font-bold text-sm px-4 py-2 rounded-31xl">
              DELETE
            </btn>
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
