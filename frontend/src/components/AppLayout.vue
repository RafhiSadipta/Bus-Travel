<template enter-class="overflow-y-auto">
  <div
    class="header w-full relative bg-dark-green h-[5.75rem] overflow-hidden shrink-0 flex flex-row items-center justify-between py-2.5 px-8 box-border text-left text-base text-green">

    <div class="w-[16.375rem] relative h-12">
      <!-- Logo link based on role -->
      <router-link :to="logoLink">
        <img src="..\assets\logo.png" alt="logo" class="cursor-pointer" />
      </router-link>
    </div>

    <router-link v-if="isLoggedIn && isUser" to="/history" class="no-underline">
        <btn class="history-btn rounded-31xl bg-transparent flex flex-row items-center justify-center py-3.5 px-[1.875rem]">
          <b class="relative font-medium history-text">HISTORY</b>
        </btn>
      </router-link>

    <div class="flex flex-row items-center justify-start gap-2 text-white">
      <!-- Conditional Buttons based on login status and role -->

      <!-- Button for users not logged in (Login and Register buttons) -->
      <router-link v-if="!isLoggedIn" to="/login">
        <btn class="history-btn rounded-31xl bg-green flex flex-row items-center justify-center py-3.5 px-[1.875rem]">
          <b class="relative">LOGIN</b>
        </btn>
      </router-link>

      <router-link v-if="!isLoggedIn" to="/register">
        <btn class="register-btn rounded-31xl bg-green flex flex-row items-center justify-center py-3.5 px-[1.875rem]">
          <b class="relative">REGISTER</b>
        </btn>
      </router-link>

      <!-- Profile Button for logged-in users (both user and admin) -->
      <btn v-if="isLoggedIn" @click="profile"
        class="profile-btn rounded-31xl bg-green flex flex-row items-center justify-center py-3.5 px-[1.875rem]">
        <b class="relative">PROFILE</b>
      </btn>

      <!-- Logout Button for logged-in users (both user and admin) -->
      <btn v-if="isLoggedIn" @click="logout"
        class="logout-btn rounded-31xl flex flex-row items-center justify-center py-3.5 px-[1.875rem] text-green">
        <b class="relative">LOGOUT</b>
      </btn>
    </div>
  </div>

  <main>
    <router-view></router-view>
  </main>
</template>

<script>
export default {
  computed: {
    // Determine the logo link based on the user role
    logoLink() {
      if (this.isUser) {
        return '/result'; // Redirect user to /result
      } else if (this.isAdmin) {
        return '/dashboard'; // Redirect admin to /dashboard
      }
      return '/'; // Redirect to home page if not logged in
    },
    // Check if user is logged in
    isLoggedIn() {
      return !!localStorage.getItem('token'); // Returns true if token exists
    },
    // Determine if the logged-in user is a regular user
    isUser() {
      const token = localStorage.getItem('token');
      if (token) {
        const role = JSON.parse(atob(token.split('.')[1])).role;
        return role === 'user';
      }
      return false;
    },
    // Determine if the logged-in user is an admin
    isAdmin() {
      const token = localStorage.getItem('token');
      if (token) {
        const role = JSON.parse(atob(token.split('.')[1])).role;
        return role === 'admin';
      }
      return false;
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token'); // Remove token from localStorage
      this.$router.push('/'); // Redirect to home or login page
    },
    profile() {
      // Redirect to profile based on role
      if (this.isUser) {
        this.$router.push('/profile'); // Redirect to user profile page
      } else if (this.isAdmin) {
        this.$router.push('/profile'); // Redirect to admin profile page
      }
    }
  }
};
</script>

<style scoped>
.history-btn,
.profile-btn,
.logout-btn,
.register-btn {
  transition: background-color 0.3s ease, color 0.3s ease;
}

.profile-btn:hover {
  background-color: rgba(16, 207, 147, 0.7);
  color: rgba(255, 255, 255, 0.9);
}

.logout-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: rgba(16, 207, 147, 0.9);
}

.register-btn:hover {
  background-color: rgba(0, 183, 137, 0.7);
}

.history-text:hover {
  transition: color 0.3s ease, font-weight 0.3s ease, text-decoration 0.3s ease, text-decoration-color 0.3s ease;
  font-weight: bold;
  text-decoration: underline;
  text-decoration-color: rgba(16, 207, 147, 1);
  color: rgba(16, 207, 147, 1);
}
</style>
