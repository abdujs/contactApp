<template>
  <v-container fluid class="auth-wrapper">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="9" md="6" lg="4">
        <v-card class="page-card auth-card">
          <div class="text-center mb-6">
            <v-avatar size="80" class="auth-avatar mb-3">
              <v-icon size="42" color="white">mdi-shield-lock</v-icon>
            </v-avatar>
            <h2 class="page-title mb-1">Secure Login</h2>
            <p class="page-subtitle">Access your contacts with JWT-protected GraphQL APIs.</p>
          </div>
          <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="handleLogin">
            <v-text-field
              v-model="identifier"
              label="Username or Email"
              :rules="[rules.required]"
              prepend-inner-icon="mdi-account"
              autocomplete="username"
              outlined
            />
            <v-text-field
              v-model="password"
              label="Password"
              :rules="[rules.required, rules.min(6)]"
              prepend-inner-icon="mdi-lock"
              type="password"
              autocomplete="current-password"
              outlined
              class="mt-2"
            />
            <v-btn
              type="submit"
              color="primary"
              class="brand-btn mt-6"
              block
              :disabled="!valid || loading"
              :loading="loading"
            >
              Login
            </v-btn>
          </v-form>
          <v-alert v-if="error" type="error" dense class="mt-4 form-alert">{{ error }}</v-alert>
          <div class="text-center mt-6">
            <nuxt-link class="link-muted" to="/register">Need an account? Register</nuxt-link>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      identifier: '',
      password: '',
      loading: false,
      error: '',
      valid: true,
      rules: {
        required: v => !!v || 'Required field',
        min: len => v => (v && v.length >= len) || `Min ${len} characters`
      }
    }
  },
  methods: {
    async handleLogin() {
      if (!this.$refs.form?.validate()) {
        return;
      }
      this.loading = true;
      this.error = '';
      try {
        const res = await axios.post('http://localhost:5000/api/auth/login', {
          identifier: this.identifier,
          password: this.password
        });
        // Save token in Vuex
        this.$store.dispatch('login', { token: res.data.token, user: res.data.user });
        // Save token in localStorage
        localStorage.setItem('token', res.data.token);
        // Reload page so Apollo picks up token for Authorization header
        window.location.href = '/contacts';
      } catch (err) {
        this.error = err.response?.data?.error || 'Login failed';
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
.auth-card {
  max-width: 520px;
  margin: 0 auto;
}

.auth-avatar {
  background: linear-gradient(135deg, #1b65ff, #5ed1ff);
  box-shadow: 0 15px 40px rgba(23, 77, 202, 0.45);
}

.link-muted {
  color: #2f3e57;
  font-weight: 600;
  text-decoration: none;
}

.link-muted:hover {
  color: #0f3dcc;
}
</style>
