<template>
  <v-container class="page-container contacts-page">
    <v-card class="page-card">
      <div class="card-header">
        <div>
          <h2 class="page-title">My Contacts</h2>
          <p class="page-subtitle">Personal CRM secured by Hasura permissions.</p>
        </div>
        <div class="header-actions">
          <v-btn color="primary" class="brand-btn mr-3" @click="openAddDialog">
            <v-icon left>mdi-plus</v-icon>
            Add Contact
          </v-btn>
          <v-btn text color="error" class="brand-btn" @click="logout">
            <v-icon left>mdi-logout</v-icon>
            Logout
          </v-btn>
        </div>
      </div>
      <v-divider class="my-4" />
      <v-alert
        v-if="errorMessage"
        type="error"
        dense
        class="mb-4 form-alert"
        dismissible
        @input="errorMessage = ''"
      >
        {{ errorMessage }}
      </v-alert>
      <div class="data-wrapper">
        <v-data-table
          :headers="headers"
          :items="contacts"
          :mobile-breakpoint="600"
          dense
          class="elevated-table"
        >
          <template v-slot:item.actions="{ item }">
            <v-btn icon @click="openEditDialog(item)">
              <v-icon color="#1b65ff">mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="openDeleteDialog(item)">
              <v-icon color="#f44336">mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </div>
    </v-card>
    <!-- Add/Edit Dialog -->
    <v-dialog v-model="dialog" max-width="520px">
      <v-card class="dialog-card">
        <v-card-title>
          <span class="headline">{{ editMode ? 'Edit' : 'Add' }} Contact</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="formValid" lazy-validation>
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-model="form.name"
                  label="Name"
                  :rules="[rules.required]"
                  outlined
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.email"
                  label="Email"
                  :rules="[rules.required, rules.email]"
                  type="email"
                  outlined
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.phone"
                  label="Phone"
                  :rules="[rules.phone]"
                  outlined
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="dialog-actions">
          <v-btn text :disabled="saving" @click="closeDialog">Cancel</v-btn>
          <v-btn
            color="primary"
            :loading="saving"
            :disabled="!formValid || saving"
            @click="saveContact"
          >
            {{ editMode ? 'Update' : 'Add' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation -->
    <v-dialog v-model="confirmDialog" max-width="400px">
      <v-card class="dialog-card">
        <v-card-title class="headline">Delete Contact</v-card-title>
        <v-card-text>
          Are you sure you want to delete
          <strong>{{ contactToDelete?.name }}</strong>?
        </v-card-text>
        <v-card-actions class="dialog-actions">
          <v-btn text :disabled="saving" @click="closeDeleteDialog">Cancel</v-btn>
          <v-btn color="error" :loading="saving" :disabled="saving" @click="confirmDelete">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'

const GET_CONTACTS = gql`
  query {
    contacts(order_by: {created_at: desc}) {
      id
      name
      email
      phone
    }
  }
`
const ADD_CONTACT = gql`
  mutation($name: String!, $email: String!, $phone: String) {
    insert_contacts_one(object: {name: $name, email: $email, phone: $phone}) {
      id
      name
      email
      phone
    }
  }
`
const UPDATE_CONTACT = gql`
  mutation($id: uuid!, $name: String!, $email: String!, $phone: String) {
    update_contacts_by_pk(pk_columns: {id: $id}, _set: {name: $name, email: $email, phone: $phone}) {
      id
      name
      email
      phone
    }
  }
`
const DELETE_CONTACT = gql`
  mutation($id: uuid!) {
    delete_contacts_by_pk(id: $id) {
      id
    }
  }
`

export default {
  data() {
    return {
      contacts: [],
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Phone', value: 'phone' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      dialog: false,
      editMode: false,
      formValid: true,
      saving: false,
      errorMessage: '',
      confirmDialog: false,
      contactToDelete: null,
      form: { id: null, name: '', email: '', phone: '' },
      rules: {
        required: v => !!v || 'Required',
        email: v => /.+@.+\..+/.test(v) || 'Enter a valid email',
        phone: v => !v || /^\+?[0-9 ()-]{7,}$/.test(v) || 'Enter a valid phone'
      }
    }
  },
  apollo: {
    contacts: {
      query: GET_CONTACTS,
      fetchPolicy: 'network-only'
    }
  },
  methods: {
    openAddDialog() {
      this.editMode = false
      this.form = { id: null, name: '', email: '', phone: '' }
      this.dialog = true
    },
    openEditDialog(item) {
      this.editMode = true
      this.form = { ...item }
      this.dialog = true
    },
    openDeleteDialog(item) {
      this.contactToDelete = item
      this.confirmDialog = true
    },
    closeDialog() {
      this.dialog = false
      this.$refs.form?.resetValidation()
    },
    closeDeleteDialog() {
      this.confirmDialog = false
      this.contactToDelete = null
    },
    async saveContact() {
      if (!this.$refs.form?.validate()) {
        return
      }
      this.saving = true
      this.errorMessage = ''
      try {
        if (this.editMode) {
          const payload = { ...this.form }
          delete payload.__typename
          await this.$apollo.mutate({
            mutation: UPDATE_CONTACT,
            variables: payload
          })
        } else {
          await this.$apollo.mutate({
            mutation: ADD_CONTACT,
            variables: { name: this.form.name, email: this.form.email, phone: this.form.phone }
          })
        }
        this.dialog = false
        this.$refs.form?.reset()
        this.$apollo.queries.contacts.refetch()
      } catch (err) {
        console.error(err)
        this.errorMessage = err.message || 'Unable to save contact right now.'
      } finally {
        this.saving = false
      }
    },
    async confirmDelete() {
      if (!this.contactToDelete) {
        return
      }
      this.errorMessage = ''
      this.saving = true
      try {
        await this.$apollo.mutate({
          mutation: DELETE_CONTACT,
          variables: { id: this.contactToDelete.id }
        })
        this.$apollo.queries.contacts.refetch()
        this.closeDeleteDialog()
      } catch (err) {
        console.error(err)
        this.errorMessage = err.message || 'Unable to delete contact right now.'
      } finally {
        this.saving = false
      }
    },
    logout() {
      this.$router.push('/logout')
    }
  }
}
</script>

<style scoped>
.contacts-page {
  padding: 0;
}

.card-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.header-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.header-actions .v-btn {
  min-width: 150px;
}

.data-wrapper {
  border: 1px solid rgba(12, 24, 48, 0.08);
  border-radius: 18px;
  overflow: hidden;
}

.elevated-table {
  border-radius: 18px;
}

.dialog-card {
  border-radius: 24px;
}

.dialog-actions {
  justify-content: flex-end;
}

@media (max-width: 600px) {
  .header-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .header-actions .v-btn {
    width: 100%;
  }
}
</style>