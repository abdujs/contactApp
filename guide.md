# **Mind Map for Contact CRUD App - Intern Onboarding Guide**

## **1. PROJECT ARCHITECTURE OVERVIEW**
```
Frontend (Client-Side)
├── Vue.js + Nuxt Framework
├── VueX (State Management)
├── Vuetify (UI Components)
├── Apollo Client (GraphQL)
└── Vue Notification

Backend (Server-Side)
├── PostgreSQL (Database)
├── Hasura (GraphQL API Layer)
├── Node.js/Express (Business Logic)
└── JWT Authentication
```

## **2. DEVELOPMENT APPROACH - PHASED LEARNING**

### **PHASE 1: UNDERSTAND THE FLOW**
```
User Action → Vue Component → Apollo Client → GraphQL (Hasura) → PostgreSQL
Response ← VueX State ← Apollo Cache ← GraphQL Response ← Hasura ← Database
```

### **PHASE 2: DATABASE FIRST (PostgreSQL)**
1. **Learn PostgreSQL Basics**

  - Create `contacts` table with fields: id, name, email, phone, created_at
  - Create `users` table with fields: id, username, email, password_hash, created_at
  - Understand primary keys, data types, constraints, and relationships

2. **Database Setup**

   ```sql
   CREATE EXTENSION IF NOT EXISTS "pgcrypto";

   CREATE TABLE users (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     username VARCHAR(50) UNIQUE NOT NULL,
     email VARCHAR(255) UNIQUE NOT NULL,
     password_hash TEXT NOT NULL,
     created_at TIMESTAMP DEFAULT NOW()
   );

   CREATE TABLE contacts (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     name VARCHAR(100) NOT NULL,
     email VARCHAR(255) UNIQUE NOT NULL,
     phone VARCHAR(20),
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

### **PHASE 3: HASURA SETUP (GraphQL Layer)**
1. **What Hasura Does**
   - Auto-generates GraphQL API from PostgreSQL schema
   - Provides real-time subscriptions
   - Handles permissions/authorization

2. **Steps**
   - Connect Hasura to PostgreSQL database
   - Track the `contacts` table
   - Auto-generate CRUD operations (queries/mutations)

### **PHASE 4: AUTHENTICATION STRATEGY**
```
Authentication Flow:
1. User login → Node.js/Express API
2. Validate credentials → Generate JWT token
3. Frontend stores token (in localStorage as per supervisor's instruction)
4. Hasura validates JWT for every GraphQL request
5. Row-level permissions in Hasura based on user claims
```

### **PHASE 5: FRONTEND STRUCTURE (Vue.js/Nuxt)**
```
📁 pages/
  └── index.vue (Contact List + Create)
  └── contacts/
      └── _id.vue (Single Contact View/Edit)

📁 components/
  ├── ContactList.vue
  ├── ContactForm.vue
  └── ContactCard.vue

📁 store/ (VueX)
  └── index.js (State management)

📁 plugins/
  └── apollo.js (GraphQL client setup)
```

### **PHASE 6: CRUD OPERATIONS MAPPING**
| Operation | Frontend (Vue) | GraphQL (Hasura) | PostgreSQL |
|-----------|----------------|------------------|------------|
| **Create** | ContactForm → Apollo Mutation | `insert_contacts` | INSERT |
| **Read**   | ContactList → Apollo Query | `contacts` | SELECT |
| **Update** | ContactForm → Apollo Mutation | `update_contacts_by_pk` | UPDATE |
| **Delete** | ContactCard → Apollo Mutation | `delete_contacts_by_pk` | DELETE |

## **3. SECURITY IMPLEMENTATION CHECKLIST**
- [ ] JWT tokens generated in Node.js/Express backend
- [ ] Never expose JWT secret in frontend
- [ ] Use environment variables for secrets
- [ ] Implement input validation in:
  - Vue components (client-side)
  - Hasura permissions (server-side)
  - Node.js endpoints (backend)
- [ ] Set up CORS properly

## **4. TOOLS & WORKFLOW**
1. **Git/GitLab**: Version control
2. **Docker**: Containerize PostgreSQL, Hasura, Node.js
3. **Docker Compose**: Orchestrate all services
4. **Environment Variables**: Separate dev/prod configs

## **5. STEP-BY-STEP STARTING POINT**

**Day 1-2**: Set up PostgreSQL locally with Docker
```yaml
# docker-compose.yml for PostgreSQL
```

**Day 3-4**: Set up Hasura and connect to PostgreSQL
- Learn GraphQL basics
- Test queries in Hasura console

**Day 5-6**: Create simple Vue.js component
- Learn Vue component structure
- Install Vuetify for UI

**Day 7-8**: Connect Vue to Hasura with Apollo
- Set up Apollo client
- Make first GraphQL query


**Day 9-10**: Backend Setup & Authentication
  - Initialize Node.js/Express project in back-end folder (`npm init -y`)
  - Install dependencies: express, pg, bcrypt, jsonwebtoken, dotenv (`npm install express pg bcrypt jsonwebtoken dotenv`)
  - Create folder structure: src/ (with routes/, controllers/, models/, config/, middleware/, utils/)
  - Create main app file: src/app.js
  - Set up database connection in src/config/db.js
  - Build authentication endpoints: register and login (use bcrypt for password hashing, jsonwebtoken for JWT)
  - Test endpoints with Postman or curl

## **6. KEY CONCEPTS TO FOCUS ON**
1. **Vue.js**: Components, props, events, lifecycle hooks
2. **Nuxt**: Pages, routing, asyncData method
3. **VueX**: State, mutations, actions, getters
4. **GraphQL**: Queries, mutations, subscriptions
5. **JWT**: Token structure, verification, claims

## **7. COMMON PITFALLS TO AVOID**
1. Store JWT in localStorage (as per supervisor's instruction; note: for production apps, HttpOnly cookies are more secure)
2. Don't expose API keys in frontend code
3. Always validate inputs on backend (Hasura permissions)
4. Use VueX for shared state, not component data
5. Handle loading and error states in Apollo queries

## **8. LEARNING RESOURCES FOCUS**
- **PostgreSQL**: Official documentation, basic SQL tutorials
- **Hasura**: Interactive tutorials on hasura.io/learn
- **Vue.js**: Vue Mastery free courses
- **Nuxt**: Official guide (nuxtjs.org/docs)
- **GraphQL**: How to GraphQL website

## **9. EXPECTED OUTCOME**
A single-page application where you can:
- Login/Register (JWT auth)
- View list of contacts (GraphQL query)
- Add new contact (GraphQL mutation)
- Edit existing contact
- Delete contact
- Real-time updates (Hasura subscriptions optional)

---

**Next Immediate Step**: Start with Docker setup for PostgreSQL. Once database is running, move to Hasura setup. Build incrementally - database → API → frontend → auth → polish.

