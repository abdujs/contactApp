// Apollo client factory configured for Hasura with JWT-based Authorization headers.
export default function () {
  return {
    httpEndpoint: 'http://localhost:8080/v1/graphql',
    getAuth: () => {
      if (typeof window === 'undefined') {
        return ''
      }
      const token = window.localStorage.getItem('token')
      return token ? `Bearer ${token}` : ''
    }
  }
}
