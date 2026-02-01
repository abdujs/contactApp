/**
 * Thin wrapper around Hasura's GraphQL endpoint that injects secrets and
 * normalizes error handling for every backend data access call.
 */
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const HASURA_GRAPHQL_URL = process.env.HASURA_GRAPHQL_URL || process.env.HASURA_URL;
const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET;

function buildHeaders() {
  const headers = { 'Content-Type': 'application/json' };
  if (HASURA_ADMIN_SECRET) {
    headers['x-hasura-admin-secret'] = HASURA_ADMIN_SECRET;
  }
  return headers;
}

export async function executeHasura({ query, variables = {} }) {
  if (!HASURA_GRAPHQL_URL) {
    throw new Error('HASURA_GRAPHQL_URL (or HASURA_URL) is not configured');
  }

  const response = await fetch(HASURA_GRAPHQL_URL, {
    method: 'POST',
    headers: buildHeaders(),
    body: JSON.stringify({ query, variables })
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Hasura request failed: ${response.status} ${message}`);
  }

  const result = await response.json();
  if (result.errors && result.errors.length) {
    throw new Error(result.errors[0].message || 'Unknown Hasura error');
  }

  return result.data;
}
