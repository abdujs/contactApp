<template>
  <v-app class="app-shell">
    <v-app-bar flat color="transparent" class="app-bar" elevate-on-scroll>
      <div class="d-flex align-center">
        <v-avatar size="44" class="brand-avatar" tile>
          <v-icon color="white">mdi-account-group</v-icon>
        </v-avatar>
        <div class="ml-3">
          <div class="text-subtitle-1 font-weight-bold text-uppercase">Contact Manager</div>
          <div class="caption text-uppercase text-tracking">Nuxt · Hasura · PostgreSQL</div>
        </div>
      </div>
      <v-spacer />
      <div class="app-bar-pill">Intern Project</div>
    </v-app-bar>
    <v-main class="app-main">
      <div class="app-content">
        <nuxt />
      </div>
    </v-main>
    <v-footer color="transparent" class="app-footer" padless>
      <v-container class="py-4 text-center">
        <span>&copy; {{ new Date().getFullYear() }} Orbit Health ·  Contact Management</span>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout'
}
</script>

<style>
.app-shell {
  min-height: 100vh;
  background: radial-gradient(circle at top, #1f50ff 0%, #0b2b7a 35%, #050f2e 100%);
  color: #f1f6ff;
}

.app-bar {
  background: transparent !important;
  color: #f8fbff;
  padding: 0 32px;
}

.brand-avatar {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 16px;
}

.text-tracking {
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.7);
}

.app-bar-pill {
  padding: 8px 18px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.15);
  color: #f8fbff;
  font-weight: 600;
  letter-spacing: 0.08em;
}

.app-main {
  min-height: calc(100vh - 140px);
  padding: 32px 16px 80px;
}

.app-content {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.page-container {
  width: 100%;
}

.page-card {
  background: #ffffff;
  border-radius: 28px;
  padding: 32px;
  box-shadow: 0 30px 80px rgba(8, 17, 37, 0.25);
  border: 1px solid rgba(15, 25, 40, 0.08);
  color: #0f1928;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #111b2e;
  margin-bottom: 4px;
}

.page-subtitle {
  color: #2f3e57;
  font-size: 0.95rem;
}

.brand-btn {
  text-transform: none;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.auth-wrapper {
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 0;
}

.form-alert {
  border-radius: 12px;
}

@media (min-width: 960px) {
  .app-main {
    padding: 48px 32px 96px;
  }

  .page-card {
    padding: 40px 48px;
  }
}
</style>
