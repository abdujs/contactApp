
<template>
  <v-container class="page-container landing-hero">
    <v-row align="center" justify="center">
      <v-col cols="12" md="7" lg="6">
        <v-card class="page-card landing-card text-center">
          <v-avatar size="84" class="mb-4 landing-avatar">
            <v-icon size="48" color="white">mdi-account-group</v-icon>
          </v-avatar>
          <h1 class="page-title mb-2">Contact Manager</h1>
          <p class="page-subtitle hero-subtitle">
            Nuxt + Hasura contacts with strict JWT ownership and a clean, adviser-ready UI.
          </p>
          <v-row class="hero-cta" justify="center" dense>
            <v-col cols="12" sm="6">
              <v-btn block class="brand-btn primary-btn" nuxt to="/login">
                <v-icon left>mdi-login</v-icon>
                Login
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6">
              <v-btn block class="brand-btn secondary-btn" nuxt to="/register">
                <v-icon left>mdi-account-plus</v-icon>
                Register
              </v-btn>
            </v-col>
          </v-row>
          <v-divider class="my-6 hero-divider" />
          <v-row class="highlight-grid" dense>
            <v-col cols="12" sm="4">
              <div class="highlight-card">
                <v-icon size="30" color="#0f62fe">mdi-fingerprint</v-icon>
                <div class="highlight-text">JWT + Hasura</div>
              </div>
            </v-col>
            <v-col cols="12" sm="4">
              <div class="highlight-card">
                <v-icon size="30" color="#0f62fe">mdi-database-lock</v-icon>
                <div class="highlight-text">Row-level data</div>
              </div>
            </v-col>
            <v-col cols="12" sm="4">
              <div class="highlight-card">
                <v-icon size="30" color="#0f62fe">mdi-cellphone-link</v-icon>
                <div class="highlight-text">Responsive UI</div>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.landing-hero {
  padding-top: 0;
  padding-bottom: 0;
  min-height: calc(100vh - 140px);
  display: flex;
  align-items: center;
}

.landing-card {
  position: relative;
  overflow: hidden;
  color: #0b1220;
  background: #ffffff;
}

.landing-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(15, 98, 254, 0.15), transparent 65%);
  pointer-events: none;
}

.landing-avatar {
  background: linear-gradient(135deg, #0f62fe, #6bd6ff);
  box-shadow: 0 20px 50px rgba(6, 29, 79, 0.45);
  margin: 0 auto;
}

.hero-subtitle {
  color: #131f3a;
  max-width: 460px;
  margin: 0 auto 28px;
}

.primary-btn {
  background: linear-gradient(120deg, #0f62fe, #4f9dff) !important;
  color: #ffffff !important;
  box-shadow: 0 12px 30px rgba(15, 98, 254, 0.35);
}

.secondary-btn {
  background: transparent !important;
  color: #0b1220 !important;
  border: 2px solid rgba(11, 18, 32, 0.8) !important;
}

.hero-divider {
  opacity: 0.3;
}

.highlight-grid {
  gap: 16px 0;
}

.highlight-card {
  border-radius: 18px;
  padding: 16px;
  background: #f2f6ff;
  border: 1px solid rgba(13, 32, 74, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 600;
  color: #0b1220;
}

.highlight-text {
  font-size: 0.95rem;
}

@media (max-width: 960px) {
  .landing-hero {
    min-height: auto;
    padding: 32px 0 56px;
  }

  .highlight-grid {
    gap: 12px 0;
  }
}

@media (max-width: 600px) {
  .landing-card {
    padding: 24px;
  }

  .highlight-card {
    padding: 14px;
  }
}
</style>
