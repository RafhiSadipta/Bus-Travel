<template enter-class="w-screen h-screen">
    <div class="self-stretch relative flex flex-col items-center justify-start py-8 px-16 box-border gap-8 text-left text-12xl">
        <h3>Profile Pengguna</h3>
        
        <!-- Form untuk Edit Profil -->
        <form @submit.prevent="updateProfile" class="flex flex-col items-center gap-4">
            <div class="flex flex-row gap-2">
                <!-- Input Username -->
                <div class="w-full rounded-81xl bg-white flex flex-row items-center justify-start py-3 px-[1.875rem] box-border">
                    <input type="text" v-model="user.username" required class="w-full bg-transparent border-none outline-none font-semibold text-sm" placeholder="Username" />
                </div>

                <!-- Input Email -->
                <div class="w-full rounded-81xl bg-white flex flex-row items-center justify-start py-3 px-[1.875rem] box-border">
                    <input type="email" v-model="user.email" required class="w-full bg-transparent border-none outline-none font-semibold text-sm" placeholder="Email" />
                </div>
            </div>

            <!-- Input Password -->
            <div class="w-full rounded-81xl bg-white flex flex-row items-center justify-start py-3 px-[1.875rem] box-border">
                <input type="password" v-model="user.password" required class="w-full bg-transparent border-none outline-none font-semibold text-sm" placeholder="Password" />
            </div>

            <!-- Role (optional) -->
            <div class="w-full rounded-81xl bg-white flex flex-row items-center justify-start py-3 px-[1.875rem] box-border">
                <select v-model="user.role" required class="w-full bg-transparent border-none outline-none font-semibold text-sm">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
            </div>

            <!-- Submit Button -->
            <div class="flex flex-row gap-2 w-3/4">
                <button type="submit" class="w-full rounded-81xl bg-green-600 flex items-center justify-center py-3 px-8 bg-green text-white font-semibold text-sm">
                    Perbarui Profil
                </button>
            </div>
        </form>

        <!-- Pesan -->
        <p v-if="message" :class="{ success: isSuccess, error: !isSuccess }">{{ message }}</p>

        <!-- Data User -->
        <div class="w-full flex flex-col items-center gap-6">
            <h4 class="font-semibold text-lg">Data Pengguna</h4>
            <p><b>Username:</b> {{ user.username }}</p>
            <p><b>Email:</b> {{ user.email }}</p>
            <p><b>Role:</b> {{ user.role }}</p>
        </div>

        <!-- Delete Account Button -->
        <div class="w-full flex justify-center">
            <button @click="deleteAccount" class="rounded-81xl bg-red-600 flex items-center justify-center py-3 px-8 text-white font-semibold text-sm">
                Hapus Akun
            </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            user: {
                username: '',
                email: '',
                password: '',
                role: 'user',
            },
            message: '',
            isSuccess: true,
        };
    },
    async created() {
        // Mendapatkan informasi pengguna dari API saat komponen dibuat
        await this.loadUserProfile();
    },
    methods: {
        async loadUserProfile() {
            try {
                const response = await axios.get(`http://localhost:5000/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Ambil token dari localStorage
                    },
                });
                this.user = response.data; // Mengisi data user dengan response dari API
            } catch (error) {
                console.error('Gagal mengambil profil pengguna:', error);
                this.message = 'Gagal memuat profil pengguna.';
                this.isSuccess = false;
            }
        },

        async updateProfile() {
            try {
                const response = await axios.put('http://localhost:5000/api/users/me', this.user, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Kirimkan token untuk autentikasi
                    },
                });
                this.message = 'Profil berhasil diperbarui!';
                this.isSuccess = true;
            } catch (error) {
                console.error('Gagal memperbarui profil:', error);
                this.message = 'Gagal memperbarui profil. Silakan coba lagi.';
                this.isSuccess = false;
            }
        },

        async deleteAccount() {
            try {
                const confirmation = confirm('Apakah Anda yakin ingin menghapus akun ini?');
                if (confirmation) {
                    await axios.delete('http://localhost:5000/api/users/me', {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`, // Kirimkan token untuk autentikasi
                        },
                    });
                    this.message = 'Akun berhasil dihapus!';
                    this.isSuccess = true;
                    // Redirect atau logout setelah penghapusan akun
                    localStorage.removeItem('token');
                    this.$router.push('/login');
                }
            } catch (error) {
                console.error('Gagal menghapus akun:', error);
                this.message = 'Gagal menghapus akun. Silakan coba lagi.';
                this.isSuccess = false;
            }
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
</style>
