<template>
  <v-container fluid class="auth-wrapper">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="page-card text-center logout-card">
          <v-avatar size="70" class="auth-avatar mb-4">
            <v-icon size="38" color="white">mdi-logout</v-icon>
          </v-avatar>
          <h2 class="page-title mb-2">Logging out...</h2>
          <p class="page-subtitle mb-4">Clearing your session and redirecting to the login screen.</p>
          <v-progress-linear indeterminate color="primary" rounded height="6" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  mounted() {
    // Remove token from localStorage
    localStorage.removeItem('token');
    // Optionally clear user info from Vuex store if used
    if (this.$store) {
      this.$store.dispatch('logout');
    }
    // Redirect to login page after a short delay
    setTimeout(() => {
      this.$router.push('/login');
    }, 800);
  }
}
</script>

<style scoped>
.logout-card {
  max-width: 420px;
  margin: 0 auto;
}

.auth-avatar {
  background: linear-gradient(135deg, #1b65ff, #5ed1ff);
}
</style>
