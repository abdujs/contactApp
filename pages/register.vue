<template>
  <v-container fluid class="auth-wrapper">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="9" md="6" lg="4">
        <v-card class="page-card auth-card">
          <div class="text-center mb-6">
            <v-avatar size="80" class="auth-avatar mb-3">
              <v-icon size="42" color="white">mdi-account-plus</v-icon>
            </v-avatar>
            <h2 class="page-title mb-1">Create Account</h2>
            <p class="page-subtitle">Spin up a secure profile to keep your contacts synced.</p>
          </div>
          <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="handleRegister">
            <v-text-field
              v-model="username"
              label="Username"
              :rules="[rules.required, rules.min(3)]"
              prepend-inner-icon="mdi-account"
              autocomplete="username"
              outlined
            />
            <v-text-field
              v-model="email"
              label="Email"
              :rules="[rules.required, rules.email]"
              prepend-inner-icon="mdi-email"
              type="email"
              autocomplete="email"
              outlined
              class="mt-2"
            />
            <v-text-field
              v-model="password"
              label="Password"
              :rules="[rules.required, rules.min(6)]"
              prepend-inner-icon="mdi-lock"
              type="password"
              autocomplete="new-password"
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
              Register
            </v-btn>
          </v-form>
          <v-alert v-if="error" type="error" dense class="mt-4 form-alert">{{ error }}</v-alert>
          <v-alert v-if="success" type="success" dense class="mt-2 form-alert">{{ success }}</v-alert>
          <div class="text-center mt-6">
            <nuxt-link class="link-muted" to="/login">Already have an account? Login</nuxt-link>
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
      username: '',
      email: '',
      password: '',
      loading: false,
      error: '',
      success: '',
      valid: true,
      rules: {
        required: v => !!v || 'Required field',
        min: len => v => (v && v.length >= len) || `Min ${len} characters`,
        email: v => /.+@.+\..+/.test(v) || 'Enter a valid email'
      }
    }
  },
  methods: {
    async handleRegister() {
      if (!this.$refs.form?.validate()) {
        return;
      }
      this.loading = true;
      this.error = '';
      try {
        await axios.post('http://localhost:5000/api/auth/register', {
          username: this.username,
          email: this.email,
          password: this.password
        });
        // Registration successful, reset fields
        this.username = '';
        this.email = '';
        this.password = '';
        this.$refs.form?.resetValidation();
        // Optionally, redirect to login or show a message
        this.$router.push('/login');
      } catch (err) {
        this.error = err.response?.data?.error || 'Registration failed';
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
  color: #fbfcfe;
  font-weight: 600;
  text-decoration: none;
}

.link-muted:hover {
  color: #fbfcfe;
}
</style>
