/**
 * User model centralizes all Hasura GraphQL queries/mutations so controllers stay persistence-agnostic.
 */
import { executeHasura } from "../config/hasuraClient.js";

const baseUserFields = `
  id
  username
  email
  password_hash
  created_at
`;

function unwrapSingleUser(data) {
  if (!data || !data.users || !data.users.length) {
    return null;
  }
  return data.users[0];
}

export async function findUserByUsernameOrEmail(username, email) {
  const query = `
    query ($username: String!, $email: String!) {
      users(where: {_or: [{username: {_eq: $username}}, {email: {_eq: $email}}]}, limit: 1) {
        ${baseUserFields}
      }
    }
  `;

  const data = await executeHasura({
    query,
    variables: { username, email }
  });

  return unwrapSingleUser(data);
}

export async function findUserByEmail(email) {
  const query = `
    query ($email: String!) {
      users(where: {email: {_eq: $email}}, limit: 1) {
        ${baseUserFields}
      }
    }
  `;

  const data = await executeHasura({
    query,
    variables: { email }
  });

  return unwrapSingleUser(data);
}

export async function findUserByUsername(username) {
  const query = `
    query ($username: String!) {
      users(where: {username: {_eq: $username}}, limit: 1) {
        ${baseUserFields}
      }
    }
  `;

  const data = await executeHasura({
    query,
    variables: { username }
  });

  return unwrapSingleUser(data);
}

export async function createUser({ username, email, password_hash }) {
  const mutation = `
    mutation ($username: String!, $email: String!, $password_hash: String!) {
      insert_users_one(object: {username: $username, email: $email, password_hash: $password_hash}) {
        id
        username
        email
        created_at
      }
    }
  `;

  const data = await executeHasura({
    query: mutation,
    variables: { username, email, password_hash }
  });

  return data?.insert_users_one || null;
}